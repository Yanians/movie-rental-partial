import { useState,useEffect } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';

import UserRegistration from '../credential/Registration';

import Login from '../credential/Login';

import VideoParentComponent from '../_dashboard/playercontrol/VideoParentComponent';

import Blog from './Blog';

import Profile from './profile';

import UserHomePage from './UserHomePage';

import Movies from '../../pages/Movies';

import {useLiveQuery as Live } from 'dexie-react-hooks';

import { UserRegister } from '../../dexie/db';

import NotFound from '../../pages/Page404';

export default function MainRoutes(props) {

    const [register, setRegister ] = useState(false);

    const [state, setState ] = useState({
      user:'',
    })

    console.log(register);

    const { user } = state;

    try{  
         Live(async()=>{
            
            await UserRegister.checking.toArray().then(async result=>{
                     if(result.length > 0){
                          result.map(i=>{
                          if(i.type === true){
                            setRegister(i.type);
                          }
                        })
                     }else{
                      setTimeout(()=>{
                       setRegister(false)
                      },1000)
                     }     
            }).catch(async (err)=>{

            })  
        });
    }catch(err){
       console.error('Error no data in database',err.stack);
    }

   const handleUserData=(data)=>{
           setState({
            ...state,
            user:data,
           })
   }

      return useRoutes([
          {
            path:'/',
            element:register === true ? <UserRegistration /> : <UserHomePage userData={handleUserData} />,
            children: [
              // {path:'*',element:<Navigate to="/404" replace />},
              {path:'/', element: <Movies />},
              // { element: <Navigate to="/blog" replace /> },
              // { element: <Navigate to="/register" replace /> },
              { path: '/movies' , element:<Movies /> },
              { path: '/trailer' , element:<VideoParentComponent /> },
              { path: '/profile' , element:<Profile user={user}/> },
              { path: '/Blog', element: <Blog />},
              { path: '/homepage', element: <Movies/>},
              { path: register === true ? '/register' : '*' , element: <UserRegistration />},
              // {path:'/404',element:<NotFound />},
              // { path: register === true ? null : 'Blog', element: <Navigate to="/Blog" replace /> },
              // { path: 'movies', element: <Movies /> },
              // { path: register === true ? null : 'movies', element: <Navigate to="/movies" replace /> },
            ]
          },
          {
            path:register === true ? '/login' :null,
            element:<Login />,
          },
          {
            path:'*',
            element:<NotFound />,
            children:[
              {path:'404',element:<NotFound />},
              {path:'*',element:<Navigate to="/404" replace />},
            ]
          }
       ])
}

