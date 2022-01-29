
import { useState, useEffect } from 'react';

import { Provider } from 'react-redux';

import { Link as RouterLink, Outlet, } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import UserNavbar from './UserNavbar';

import UserSidebar from './UserSidebar';

import store from '../../redux/store';

const APP_BAR_MOBILE = 64;

const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default function UserHomePage(props) {

  const [open, setOpen] = useState(false);

  const [state,setState ] = useState({
      user:'',
  })

  const { user } = state;

  const handleUserData=(data)=>{
      setState({
        ...state,
        user:data,
      })
  }

  useEffect(()=>{
      props.userData(user);
  },[user])

  return (
   <Provider store={store}> 
    <RootStyle>
      <UserNavbar onOpenSidebar={() => setOpen(true)} userData={user}/>
      <UserSidebar userData={handleUserData} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
         <Outlet />
         {/*<SearchItemFound />*/}
      </MainStyle>
    </RootStyle>
  </Provider>
  );
}
