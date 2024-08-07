import "./style.scss";
import { FC, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useLocation } from "react-router-dom";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector, updateSelectedFiles, updateExportFiles } from '../../redux';
import { useExportMutation, useRemoveObjectMutation } from "../../services";

interface IProps {
    title?: string
    viewMode: "grid" | "list"
    onSelectViewMode: (viewMode: string) => void
}

const ContentHeader: FC<IProps> = ({ title, viewMode, onSelectViewMode }) => {
    const location = useLocation();
    const distach = useAppDispatch();
    const [exportMutation] = useExportMutation();
    const [removeObjectMutation] = useRemoveObjectMutation();
    const selectedFiles = useAppSelector(state => state.objectSlice.selectedFiles);
    const [alignment, setAlignment] = useState<string | null>(viewMode || 'grid');

    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            onSelectViewMode(newAlignment)
        }
    };

    const onDownload = async () => {
        try {
            const res = await exportMutation({ objectsIds: selectedFiles });
            if (res.data?.data) {
                distach(updateExportFiles([res.data.data]));
            }
            // const url = window.URL.createObjectURL(new Blob([data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'files.zip');
            // document.body.appendChild(link);
            // link.click();

        } catch (error) {
            console.log({ error });
        }
    }

    const onRemove = async () => {
        try {
            await removeObjectMutation({ _ids: selectedFiles });
            distach(updateSelectedFiles([]));
        } catch (error) {
            console.log("Error on removing objects: ", { error });
        }
    }

    const urlTitle = location.pathname.split("/")[1];

    return (
        <div>
            <Box className='center' justifyContent="space-between" paddingTop="20px">
                <Typography fontWeight="600" textTransform="uppercase" variant="h6" sx={{ textTransform: "capitalize" }}>{title ?? urlTitle}</Typography>

                <div className="action">
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size="small"
                    >
                        <ToggleButton value="grid" aria-label="centered">
                            <ViewModuleIcon />
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="left aligned">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>

                </div>
            </Box>

            <div className="file-actions">
                {
                    selectedFiles.length ?
                        <div className="active">
                            <IconButton onClick={() => distach(updateSelectedFiles([]))}><CloseIcon /></IconButton>
                            <Typography variant="body2">{selectedFiles.length} Selected</Typography>
                            <IconButton className="ml-3" onClick={onDownload}>
                                <Tooltip title="Download">
                                    <DownloadIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton className="ml-1" onClick={onRemove}>
                                <Tooltip title="Move to Trash">
                                    <DeleteIcon />
                                </Tooltip>
                            </IconButton>
                        </div>
                        :
                        <Typography variant="caption">No item selected!</Typography>
                }
            </div>
        </div>
    )
}

export default ContentHeader