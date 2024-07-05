import { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import useObject from '../../hooks/useObject';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const CustomSpeedDial = () => {    
    const [open, setOpen] = useState(false);
    const { addFiles } = useObject();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const actions = [
        {
            icon: <Box
                component="label"
                role={undefined}
                tabIndex={-1}
                sx={{ cursor: "pointer" }}
            >
                <CloudUploadIcon />
                <VisuallyHiddenInput type="file" multiple onChange={addFiles} />
            </Box>

            , name: 'Upload'
        },
        { icon: <FolderOpenIcon />, name: 'Folder' },
    ];

    return (
        <Box>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default CustomSpeedDial;
