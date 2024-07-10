import "./style.scss";
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';

import { IObjectState } from "../../../interfaces";
import { useObjectsQuery } from "../../../services";
import ContentCard from "../../../components/content-card";
import CustomDropzone from "../../../components/custom-dropzone";
import ContentHeader from '../../../components/content-header';

const MyDrive = () => {
    const [state, setState] = useState<IObjectState>({
        data: [],
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

            <CustomDropzone height="calc(100% - 135px)" onScroll={onScroll}>
                <Grid container spacing={2}>
                    {
                        data?.data.map(ele => {
                            return <ContentCard
                                key={ele._id}
                                id={ele._id}
                                mimeType={ele.originalType}
                                title={ele.originalName}
                                previewUrl={ele.thumbnailPath}
                            />
                        })
                    }
                </Grid>
            </CustomDropzone>


        </div>
    )
}

export default MyDrive