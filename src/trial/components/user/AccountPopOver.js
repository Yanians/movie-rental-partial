import { Icon } from '@iconify/react';

import { useRef, useState,useEffect } from 'react';

import homeFill from '@iconify/icons-eva/home-fill';

import personFill from '@iconify/icons-eva/person-fill';

import settings2Fill from '@iconify/icons-eva/settings-2-fill';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';

import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from './MenuPopover';
//
import { account } from '../.././_db_';

import { UserRegister } from '../../dexie/db';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/profile'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover(props) {

  const { userData } = props;

  const { url,password,isLogin } = userData;

  console.log(isLogin)

  console.log(password);

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [state, setState ] = useState({
      email:'',
      img:'',
  })

  const { email } = state;

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout= async() => {      
              const object = {type:true,}
              UserRegister.checking.put(object);
              UserRegister.login.update(1,{password:'',isLogin:false,});
              navigate('/register', { replace: true });         
  }
console.log(isLogin);
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={isLogin ? url : account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {isLogin ? email : account.displayName }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {isLogin ? email : account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {isLogin ? MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        )) : null}
       
       {
        isLogin ? <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box> : null
       }
      </MenuPopover>
    </>
  );
}
