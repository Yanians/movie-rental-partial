import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
// components
import Logo from '../Logo';
//
import { MHidden } from '../@material-extend';

import { UserRegister } from '../../dexie/db';

import *as W from '../../../lib';

const Text = W.AbstractGlobal(Typography);
// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {

         const backToHome=async()=>{
            await UserRegister.checking.toArray().then((result)=>{
                   if(result.length === 0){
                    console.log('result length is 0')
                    UserRegister.login.update(1,{password:''});
                          window.location.reload(false);
                   }
                       result.map(i=>{
                      UserRegister.table('checking').delete(i.id).then((e)=>{
                        UserRegister.login.update(1,{password:'',isLogin:false,});
                        window.location.reload(false);
                      })  
                })
             }).catch(err=>{
              console.error("Error found during deletion of checking table",err)              
             }).finally(()=>{
                UserRegister.open();
             });     
      }
  return (
    <HeaderStyle>
      <RouterLink to="/homepage" style={{textDecoration:'none'}} onClick={e=>backToHome(e)}>
      <Button variant="contained" color="primary" size="small">Home</Button>
      </RouterLink>

      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
