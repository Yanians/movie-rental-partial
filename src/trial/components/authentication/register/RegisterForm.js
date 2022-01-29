
import * as Yup from 'yup';

import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';

import { useFormik, Form, FormikProvider } from 'formik';

import eyeFill from '@iconify/icons-eva/eye-fill';

import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import { useNavigate, } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { UserRegister } from '../../../dexie/db';

import Swal from 'sweetalert2';
// ----------------------------------------------------------------------
export default function RegisterForm(props) {

  const navigate = useNavigate();

  window.history.forward(); //do not allow back history

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const [state, setState ] = useState(false);

  const [flag, setFlag ] = useState(false);

  // const [ dataRegister, setDataRegister ] = useState({});

  useEffect(()=>{
  //  async function Run(){
  //   if(state === true && flag === true){
  //         await UserRegister.checking.toArray().then(count=>{
  //            count.map(i=>{
  //                UserRegister.table("checking").delete(i.id).then(response=>{
  //                     const { email, password } = dataRegister;
  //                      UserRegister.register.put(dataRegister);
  //                      UserRegister.login.put({email, password});
  //                      setState(true);
  //                      setSuccess(false);
  //                      formik.resetForm();
  //                       navigate('/homepage',{replace:true})
  //                })
  //                 UserRegister.open();
  //            })
  //         })
  //   }
  // }Run();
    
  },[flag, state, success ]);

  console.log(state);
  console.log(flag);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit:(values, key,event) => {
      const { firstName, lastName, email, password } = values;
      console.log(values);
        let dis = false;
        UserRegister.register.toArray().then(res=>{
      if(res === undefined){
          Swal.fire({
            title:'Diagnosing',
            html:'<b>Please wait...</b>',
            icon:'question',
            timer:1700,
            showConfirmButton:false,
            allowOutsideClick:()=>!Swal.isLoading(),
            didOpen:()=>{
                Swal.showLoading()
            }
          }).then(async result=>{
            if(result.dismiss === Swal.DismissReason.timer){
                await UserRegister.open();
                window.location.reload(false);
            }
          })
      }else if(res.length > -1 && res !== undefined){    
              setState(!state);
              setSuccess(!success);
              setTimeout(()=>{
                setState(false)
                setSuccess(false)
                 UserRegister.checking.toArray().then(count=>{
                     count.map(i=>{
                         UserRegister.table("checking").delete(i.id).then(()=>{
                            let timerInterval
                            Swal.fire({
                                  width:100,
                                  height:70,
                                  timer:500,
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
                                  },
                                   willClose: () => {
                                      clearInterval(timerInterval)
                                   }
                              }).then((result)=>{
                                      UserRegister.register.put(values);
                                      UserRegister.login.put({email, password,isLogin:true});
                                  if(result.dismiss === Swal.DismissReason.timer){
                                          formik.resetForm();
                                          navigate('/homepage',{replace:true})
                                   }
                              })
                         })
                     })
                  })
              },1000)     
      }else{
    setState(!state);
    setSuccess(!success);
    setTimeout(()=>{
                setState(false);
                setSuccess(false);
           Promise.all(res.map((i,index)=>{
              if(email === i.email){
                  setFieldError('email','email has already been taken');
                  setState(false);
                  setSuccess(false);
                    return dis = false;
                }else if(password === i.password){
                    setFieldError('password','password has already been taken');
                    setState(false);
                    setSuccess(false);
                    return dis = false;
                }else{
                  setState(true);
                  setFlag(true)
                  return dis = true;
                }
         }));
      },1000)    
    }    
          }).catch(err=>{
              console.error("Error encountered line 61 RegisterForm ",err)
          }).finally(async()=>{
              await UserRegister.open()
          });
   }
});
 
  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldError } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField fullWidth autoComplete="username" type="email" label="Email address"
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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color={state ? "success":"primary"}
            variant="contained"
            loading={success}
          >
            {state ? "Success" : "Register" }
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}


