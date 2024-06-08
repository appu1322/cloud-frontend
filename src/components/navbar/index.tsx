import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import './style.scss';
import { useState } from 'react';
import { Logout } from '@mui/icons-material';

interface IState {
  accountSettingAnchorEl: null | HTMLElement
}

const Navbar = () => {
  const [state, setState] = useState<IState>({
    accountSettingAnchorEl: null
  })
  const showAccountSetting = Boolean(state.accountSettingAnchorEl);

  const handleAccountSetting = (event: React.MouseEvent<HTMLElement>) => {
    setState(prev => ({ ...prev, accountSettingAnchorEl: event.currentTarget }))
  }

  return (
    <>
      <Box className='center navbar' justifyContent="space-between" >
        <div>
          <Typography variant="h5">Check</Typography>
        </div>

        <div>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleAccountSetting}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={showAccountSetting ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={showAccountSetting ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={state.accountSettingAnchorEl}
            id="account-menu"
            open={showAccountSetting}
            onClose={handleAccountSetting}
            onClick={handleAccountSetting}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
      
    </>

  )
}

export default Navbar