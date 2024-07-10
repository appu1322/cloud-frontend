import "./style.scss";
import { FC, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector, updateExportFiles } from '../../redux';


interface IProps {
    title: string 
    viewMode: "grid" | "list"
    onSelectViewMode: (viewMode: string) => void
}

const ContentHeader: FC<IProps> = ({ title, viewMode, onSelectViewMode }) => {
    const exportObject = useAppSelector(state => state.objectSlice.export);
    const distach = useAppDispatch();
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

    return (
        <div>
            <Box className='center' justifyContent="space-between" paddingTop="20px">
                <Typography fontWeight="600" textTransform="uppercase" variant="h6">{title}</Typography>

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
                    exportObject.files.length ?
                        <div className="active">
                            <IconButton onClick={() => distach(updateExportFiles([]))}><CloseIcon /></IconButton>
                            <Typography variant="body2">{exportObject.files.length} Selected</Typography>
                            <IconButton className="ml-3">
                                <Tooltip title="Download">
                                    <DownloadIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton className="ml-1">
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