import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface IProps {
    title: string 
    viewMode: "grid" | "list"
    onSelectViewMode: (viewMode: string) => void
}

const ContentHeader: FC<IProps> = ({ title, viewMode, onSelectViewMode }) => {
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
        </div>
    )
}

export default ContentHeader