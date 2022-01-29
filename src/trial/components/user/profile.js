
import PropTypes from 'prop-types';

import {useState,useEffect } from 'react';

import Page from '../../components/Page';

import { styled,alpha } from '@mui/material/styles';

import { LoadingButton } from '@mui/lab';

import Swal from 'sweetalert2';

import *as Yup from 'yup';

import { useFormik, Form, FormikProvider } from 'formik';

import { Stack, TextField, Button, IconButton, InputAdornment,Avatar } from '@mui/material';

import { UserRegister } from '../../dexie/db';

import *as L from '../../../lib';

const Lay = styled(props=>{
	const { center, children,...other } = props;
	  return <div {...other}>
	            {children}
	         </div>
	})(({ theme, center })=>({
		display:'flex',
		width:'auto',
		alignItems:center?'center':'start',
		justifyContent:center?'center':'start',
	}))

const BoxLayout = styled('div')(({ theme })=>({
	 border:`1px dashed darkred`,
	 padding:theme.spacing(4),
	 borderRadius:theme.shape.borderRadius,
     [theme.breakpoints.up('sm')]:{
     	maxWidth:theme.spacing(80),
     }
}));

const Input = styled('input')({
	display:'none',
})

export default function Profile(props){
	  const {firstName,lastName,email,contact,url, id } = props.user;
	const [state,setState ] = useState({
		user:[],
		password:'',
		efirstName:firstName,
		elastName:lastName,
		eemail:email,
		econtact:contact,
		eurl:url,
		isLoading:false,
	});

	const updateSchema = Yup.object().shape({
		firstName:Yup.string().min(2,'too short').max(50,'Too long!').required('First Name required'),
		lastName:Yup.string().min(2,'too short').max(50,'Too long!').required('Last Name required'),
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		url:Yup.string().required('upload an Image'),
		contact:Yup.string().min(10,'must be 11 digits').max(11).required('contact is required!'),
	})

	const formik = useFormik({
		initialValues:{
			firstName:'',
			lastName:'',
			email:'',
			contact:'',
			url:'',
		},
		validationSchema:updateSchema,
		onSubmit:(value,key,event)=>{
			const {firstName,lastName,email,contact,url} = value;
			console.log(value);
			 key.setFieldError('contact','please do not leave empty!')
		}
	})
	
	const { user,password, efirstName, elastName, eemail, econtact, eurl,isLoading } = state;	

    
	useEffect(()=> {
	
	},[efirstName, elastName, eemail, econtact, eurl]);

	const handleFile= async(e)=>{
   	   const reader = new FileReader()
             reader.onload =(e)=>{
                setState({...state,eurl:reader.result})
             }
             reader.readAsDataURL(e[0]);
	}

	const handleChangeFirstName=async(e)=>{
 	      setState({
 	       	...state,
 	       	efirstName:e.target.value,
 	       })  
	}

	const handleChangeLastName=(e)=>{
 	      setState({
 	       	...state,
 	       	elastName:e.target.value,
 	       })  
	}

	const handleChangeEmail=(e)=>{
          setState({
          	...state,
          	eemail:e.target.value,
          })
	}

	const handleChangeContact=(e)=>{
		console.log(e.target.value)
        setState({
        	...state,
        	econtact:e.target.value,
        })
	}

	const handleSubmits=(e)=>{
		e.preventDefault();
      if(efirstName !== "" && elastName !== "" && eemail !== "" && econtact !== "" && eurl !== ""){
	      Swal.fire({
	       	title:'Updated',
	       	icon:'success',
	       	showConfirmButton:false,
	       	timer:1500,
	       }).then((result)=>{
	       	  if(result.dismiss === Swal.DismissReason.timer){
      	         UserRegister.register.update(id,
		      	      	  {
		      	      	  	firstName:efirstName,
		      	      	  	lastName:elastName,
		      	      	  	email:eemail,
		      	      	  	contact:econtact,
		      	      	  	url:eurl,
		      	      	  }
		      	 )
      	      }
      	    })  
      
	}else{
       Swal.fire({
       	title:'Do not leave empty field',
       	icon:'info',
       	showConfirmButton:false,
       	timer:1500,
       });
	}
}	

const { values, errors, touched, handleSubmit, setStatus, setValues, getFieldProps, isSubmitting,setFieldValue } = formik;	

console.log(formik)
  return(
       <Page title="User:Profile | Movie-Rental">
           <L.Typographyui textContent="Your Profile" monospace bold shadowred />
       	 <Stack spacing={3}>
       	   <BoxLayout>
       	     <FormikProvider value={formik}>
       	     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
               <Stack spacing={2}> 
                     <Lay center>
	                      <label htmlFor="icon-button-file">
	                         <Input accept="image/*" id="icon-button-file" type="file" onChange={e=>handleFile(e.target.files)}/>
	                         <L.Ib aria-label="upload-picture" component="span">
	                           <Avatar src={eurl} alt="undefined" sx={{bgcolor:'orange',width:70,height:70, }} />
	                         </L.Ib>
	                      </label> 
                      </Lay>
                     <L.Inputfield 
                         fullWidth text outlined primary label="First Name" v={efirstName} semi onChange={handleChangeFirstName}
                         error={Boolean(touched.firstName && errors.firstName)} 
                         helperText={touched.firstName && errors.firstName}/>
                     <L.Inputfield 
                         fullWidth text outlined primary label="Last Name"  v={elastName} semi onChange={handleChangeLastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                         />
                     <L.Inputfield 
                         fullWidth text outlined primary label="Email"  v={eemail} semi onChange={handleChangeEmail}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                         />
                     <L.Inputfield 
                        fullWidth number outlined primary label="Contact" semi v={econtact}  onChange={handleChangeContact}
                       error={Boolean(touched.contact && errors.contact)}
                       helperText={touched.contact && errors.contact}
                       />
                     <LoadingButton
                         loadingIndicator="Loading..."
                         onClick={handleSubmits}
                         loading={isLoading}
                         variant="contained" color="primary">update</LoadingButton>
	           	</Stack>
	          </Form>
	        </FormikProvider>   	
       	    </BoxLayout>	   
       	 </Stack>
       
       </Page>
  	)
}

