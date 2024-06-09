import "./style.scss";
import { Grid, IconButton, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContentHeader from '../../../components/content-header';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCard from "../../../components/content-card";
import { useEffect, useState } from "react";
import CustomDropzone from "../../../components/custom-dropzone";

const data = [
    {
        id: 1,
        title: "test",
        logo: <InsertDriveFileIcon fontSize="small" />
    },
    {
        id: 2,
        title: "test2",
        logo: <InsertDriveFileIcon fontSize="small" />
    },
    {
        id: 3,
        title: "tes3",
        logo: <InsertDriveFileIcon fontSize="small" />
    },
    {
        id: 4,
        title: "tes4",
        logo: <InsertDriveFileIcon fontSize="small" />
    },
    {
        id: 5,
        title: "tes5",
        logo: <InsertDriveFileIcon fontSize="small" />
    }
]

interface IState {
    selected: Array<string | number>
    shiftPressing: boolean
}

const MyDrive = () => {
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
                        data.map(ele => {
                            return <ContentCard
                                key={ele.id}
                                id={ele.id}
                                logo={ele.logo}
                                title={ele.title}
                                active={state.selected.includes(ele.id)}
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