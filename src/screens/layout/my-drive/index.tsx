import "./style.scss";
import { Grid, IconButton, Typography } from '@mui/material';
import ContentHeader from '../../../components/content-header';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCard from "../../../components/content-card";
import { useEffect, useState } from "react";
import CustomDropzone from "../../../components/custom-dropzone";
import { useObjectsQuery } from "../../../services";

interface IState {
    selected: Array<string | number>
    shiftPressing: boolean
}

const MyDrive = () => {
    const { data } = useObjectsQuery({
        pagination: true,
        page: 1,
        limit: 20
    });
    const [state, setState] = useState<IState>({
        selected: [],
        shiftPressing: false
    });

    useEffect(() => {
        window.addEventListener("keydown", e => {
            if (e.repeat) {
                return
            }
            setState(prev => ({ ...prev, shiftPressing: true }))
        });
        window.addEventListener("keyup", e => {
            if (e.repeat) {
                return
            }
            setState(prev => ({ ...prev, shiftPressing: false }))
        });

    }, [])


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

            <CustomDropzone height="calc(100% - 113px)">
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