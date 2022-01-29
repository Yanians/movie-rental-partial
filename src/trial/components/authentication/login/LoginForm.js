import * as Yup from 'yup';

import { useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

import { Icon } from '@iconify/react';

import eyeFill from '@iconify/icons-eva/eye-fill';

import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import Swal from 'sweetalert2';
// material
import {
  Link,

  Stack,

  Checkbox,

  TextField,

  IconButton,

  InputAdornment,

  FormControlLabel

} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import{ UserRegister } from '../../../dexie/db';

export default function LoginForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [ isLoading, setLoading ] = useState(true);

  const [state, setState ] = useState(false);

  const [success, setSuccess ] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(4).max(14).required('Password required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit:(values, key) => {
     if(formik.submitCount === 4){
              Swal.fire({
                title:'<h2>Stop!</h2>',
                icon:'error',
                html:'<b>Please Register to get Started!</b>',
                showConfirmButton:false,
                timer:2000,
              }).then((result)=>{
                   if(result.dismiss === Swal.DismissReason.timer){
                     navigate('/register', { replace: true });
                   }
              })
                    
     }else{
        setState(!state);  
        setSuccess(!success);
         setTimeout(async()=>{
          await UserRegister.register.toArray().then((response)=>{
              if(response.length > 0){    
                setSuccess(false)
                   response.map(i=>{
                      if(values.email === i.email && values.password === i.password){                     
                        UserRegister.checking.toArray().then(result=>{
                          result.map(item=>{
                              UserRegister.login.update(1,{password:values.password,isLogin:true})
                              UserRegister.table('checking').delete(item.id).then(()=>{
                                    
                          let timerInterval
                            Swal.fire({
                                        html:'Wait...<b></b>',
                                        width:150,
                                        height:70,
                                        timer:1200,
                                        background: '#fff url(/images/trees.png)',
                                        timerProgressBar:false,
                                        showConfirmButton:false,
                                        backdrop:`
                                          rgba(1,0,123,0.8)
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
                              }).then((result)=>{
                                  if(result.dismiss === Swal.DismissReason.timer){
                                          navigate('/homepage',{replace:true})
                                   }
                              })
                            })
                         })
                       })        
                       }else{
                        key.setFieldError('password','password not found!')
                        key.setFieldError('email','or checked email');
                        setState(false);
                        setSuccess(false);
                       }   
                    })
              }else{
                setState(false);
                setSuccess(false);
                Swal.fire({
                     title:'<h2>No records in database!</h2>',
                     html:`<b>Please Register first!</b>`,
                     showConfirmButton:false,
                     icon:'info',
                     timer:2500,
                       backdrop:`
                        rgba(1,0,123,0.3)
                        url("${eyeOffFill}")
                        left top
                        no-repeat
                      `,
                }).then(()=>{
                   navigate('/register',{replace:true})
                })
              }     
          })    
        },1500)
   }
 }
})

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}

            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color={state ? "success" : "primary"}
          variant="contained"
          loading={success}
        >
         {state ? "Successfully Login" : "Login" }
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
