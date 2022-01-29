
import PropTypes from 'prop-types';

import { useEffect, useState,Fragment } from 'react';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

import Logo from '../Logo';

import Scrollbar from '../Scrollbar';

import NavSection from '../NavSection';

import { MHidden } from '../@material-extend';

import sidebarConfig from './UserSidebarConfig';

import Swal from 'sweetalert2';

import *as W from '../../../lib';

import { UserRegister } from '../../dexie/db';

export const Title = W.AbstractGlobal(Typography);

// ----------------------------------------------------------------------
const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}))

const account = {
  displayName:'Welcome Guest',
  email:'paylastres@gmail.com',
  photoUrl:'../../static/mock-images/avatar_defaults.jpg',
};

// ----------------------------------------------------------------------

UserSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  userData: PropTypes.func,
};

export default function UserSidebar({ isOpenSidebar, onCloseSidebar,userData}) {

  const [state, setState ] = useState({
     user:[],
     isLoginPassword:'',
     login:false,
  })
  
  const { user,isLoginPassword,login } = state;
  
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [ toRegister, setToRegister ] = useState(false);

  useEffect(()=>{

    if(isOpenSidebar){
      onCloseSidebar();
    }
    async function F(){
        
        let timerInterval
          const returners = Swal.fire({
                      html:'Wait...<b></b>',
                      width:150,
                      height:70,
                      timer:400,
                      background: '#fff url(/images/trees.png)',
                      timerProgressBar:false,
                      showConfirmButton:false,
                      backdrop:`
                        rgba(1,0,123,0.3)
                        url("../video-rental/images/1.jpg")
                        left top
                        no-repeat
                      `,
                      didOpen:(e)=>{
                         Swal.showLoading()
                         timerInterval = setInterval(() => {
                            const content = Swal.getContainer()
                            if (content) {
                              const b = content.querySelector('b')
                              if (b) {
                                b.textContent = Swal.getTimerLeft()
                              }
                            }
                          }, 100)
                      },
                       willClose: () => {
                          clearInterval(timerInterval)
                       }
            }).then(async(result)=>{
              const isLogin = await UserRegister.login.toArray();
                isLogin.map((found)=>{
                  UserRegister.register.toArray().then((users)=>{
                    users.map(user=>{
                        if(users.length !== 0 && found.password === user.password ){
                              setState({
                                ...state,
                                user:users,
                                isLoginPassword:found.password,
                                login:true,
                              })
                              userData({
                                firstName:user.firstName,
                                lastName:user.lastName,
                                email:user.email,
                                contact:user.contact,
                                url:user.url,
                                id:user.id,
                                isLogin:found.isLogin,
                                password:user.password,
                              });
                        }
                    })
                 })
               })     
              const objects = {type:toRegister};
                if(result.dismiss === Swal.DismissReason.timer){
                   return objects;        
                }
              
            })
            return returners;
    }

     F().then(async(result) =>{
        if(result.type === false){
               return;
        }else{
            await UserRegister.checking.put(result);
              navigate('/register', { replace: true });
          }
      }).catch(err=>{
        console.error("error in add method of schema: ", err);
      })        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [pathname, toRegister]);

     const willRegister = ()=>{
        setToRegister(true);       
     }

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" style={{ textDecoration:'none', display:'inline-flex' }} >  
          <Logo sx={{width:70,height:70,}} />
            <Title textContent="vie Rental" monospace bold h5 div positive2 noWrap instagram sx={{pt:3.8,flexGrow:1}} />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
          {
            login ? user.map((item,index)=>{
                 if(isLoginPassword === item.password){
                    return <Fragment key={item.id}>
                              <Avatar src={item.url !== "" ? item.url : account.photoURL} alt="photoURL" />
                                <Box sx={{ ml: 2 }}>
                                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {(`Welcome ${item.firstName}`)}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {account.role}
                                  </Typography>
                                </Box>
                            </Fragment>         
                 }else{
                    return <Fragment>
                              <Avatar src={account.photoURL} alt="photoURL" />
                                <Box sx={{ ml: 2 }}>
                                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {account.displayName}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {account.role}
                                  </Typography>
                                </Box>
                            </Fragment>          
                 }
                
            }) : <Fragment>
                              <Avatar src={account.photoURL} alt="photoURL" />
                                <Box sx={{ ml: 2 }}>
                                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {account.displayName}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {account.role}
                                  </Typography>
                                </Box>
                            </Fragment>   
          }  
           
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        {        
          login ? null : <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'primary.lighter'
          }}
        ><Box
            component="img"
            src="/static/images/vertex-logo.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Title textContent={'Want a Discount ? '} gutterBottom variant="h6" />
            <Title textContent={'less 20%'} sansserif sx={{color:'text.secondary'}} bold px18/>
          </Box>

          <Button
            fullWidth
            onClick={e=>willRegister(e)}
            // href="/register"
            target="_blank"
            variant="contained"
          >
            Signup Now!
          </Button>
        </Stack> 
        }  

      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
