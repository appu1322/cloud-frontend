import "./style.scss";
import { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

import { IObjectState } from "../../../interfaces";
import { useObjectsQuery } from "../../../services";
import ContentCard from "../../../components/content-card";
import CustomDropzone from "../../../components/custom-dropzone";
import ContentHeader from '../../../components/content-header';

const MyDrive = () => {
    const [state, setState] = useState<IObjectState>({
        data: [],
        selected: [],
        shiftPressing: false,
        pagination: {
            page: 1,
            totalPages: 1,
            totalRecords: 0
        }
    });
    const { data, refetch } = useObjectsQuery({
        pagination: true,
        page: state.pagination.page,
        limit: 20,
        skip: false
    });

    useEffect(() => {
        if (data?.data) {
            const meta = data.meta;
            const objects = data.data;
            setState(prev => ({
                ...prev,
                data: [...prev.data, ...objects],
                pagination: {
                    ...prev.pagination,
                    totalPages: meta.totalPages,
                    totalRecords: meta.totalRecords
                }
            }))
        }
    }, [data?.data]);

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.repeat) {
            return
        }
        setState(prev => ({ ...prev, shiftPressing: true }))
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) {
            return
        }
        setState(prev => ({ ...prev, shiftPressing: false }))
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyUp);
        window.addEventListener("keyup", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyUp);
            window.removeEventListener("keyup", onKeyDown);
        }
    }, []);


    const onSelect = (id: string | number) => {
        let payload = state.selected;

        if (payload.includes(id) && state.shiftPressing) {
            payload = payload.filter(ele => ele !== id);
            setState(prev => ({ ...prev, selected: payload }));
        } else if (payload.includes(id)) {
            setState(prev => ({ ...prev, selected: payload.length > 1 ? [id] : [] }));
        } else if (state.shiftPressing) {
            setState(prev => ({ ...prev, selected: [...state.selected, id] }));
        } else {
            setState(prev => ({ ...prev, selected: [id] }));
        }
    }

    const onScroll = () => {
        if (state.pagination.page !== state.pagination.totalPages) {
            setState(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    page: prev.pagination.page + 1
                }
            }));
            refetch();
        }
    }

    return (
        <div className="h-100">
            <ContentHeader
                title='My Drive'
                viewMode="grid"
                onSelectViewMode={(mode) => console.log(mode)}
            />

            <div className="file-actions">
                {
                    state.selected.length ?
                        <div className="active">
                            <IconButton onClick={() => setState(prev => ({ ...prev, selected: [] }))}><CloseIcon /></IconButton>
                            <Typography variant="body2">{state.selected.length} Selected</Typography>
                            <IconButton className="ml-3"><DownloadIcon /></IconButton>
                        </div>
                        :
                        <Typography variant="caption">No item selected!</Typography>
                }
            </div>

            <CustomDropzone height="calc(100% - 113px)" onScroll={onScroll}>
                <Grid container spacing={2}>
                    {
                        data?.data.map(ele => {
                            return <ContentCard
                                key={ele._id}
                                id={ele._id}
                                mimeType={ele.originalType}
                                title={ele.originalName}
                                active={state.selected.includes(ele._id)}
                                previewUrl={ele.thumbnailPath}
                                onClick={onSelect}
                            />
                        })
                    }
                </Grid>
            </CustomDropzone>


        </div>
    )
}

export default MyDrive