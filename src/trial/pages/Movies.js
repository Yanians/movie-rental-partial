
import { useState, useReducer, useEffect, useCallback } from 'react';

import { useSelector, connect } from 'react-redux';

import { useFormik } from 'formik';

import { Container, Stack, Typography } from '@mui/material';

import *as actionTypes from '../redux';

import Page from '../components/Page';

import {

  MoviesSort,

  MoviesList,

  MoviesCartWidget,

  MoviesFilterSidebar

} from '../components/_dashboard/movies';

import { movies } from '../_db_';

import *as W from '../../lib';

function EcommerceShop(props) {

  const MovieTitle = W.AbstractGlobal(Typography);

  const rollbackData = useSelector(item=>item.Movies);

  const tag = useSelector(item=>item.NameTag);
   
  const [ openFilter, setOpenFilter ] = useState(false);
         
  const [ options, setOptions ] = useState('');

  useEffect(()=> {

    props.dispatch(actionTypes.GetData(movies));

        switch(options){

           case "High-Low" : props.dispatch({type:actionTypes.HIGH_LOW});break;

           case "Low-High" : props.dispatch({type:actionTypes.LOW_HIGH});break;

           case "Newest" : props.dispatch({type:actionTypes.NEWEST});break;

           case "Featured" : props.dispatch({type:actionTypes.FEATURED});break;

           case "dvd" : props.dispatch({type:actionTypes.DVD_TYPE});break;

           case "cd" : props.dispatch({type:actionTypes.CD_TYPE});break;

           default:return null;
        }

  },[ options ]);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleSort = (option, event) => {   
      setOptions(option);
  }   

  return (
    <Page title="Movies: Products | Video-Rental">
      <Container>
         <MovieTitle variant="h3" noWrap oblique sx={{mb:1}} instagram bold  shadowgrey positive1 textContent={tag} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <MoviesFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <MoviesSort labeled={( options, event)=>handleSort(options, event)} />
          </Stack>
        </Stack>
        <MoviesList movies={rollbackData} />
        <MoviesCartWidget />
      </Container>
    </Page>
  );
}

const mapStateToProps = state => {
   return{
    datas:state.datas,
   }
};

export default connect(mapStateToProps)(EcommerceShop);
