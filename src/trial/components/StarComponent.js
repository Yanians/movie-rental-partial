
import PropTypes from 'prop-types';

import { styled, alpha } from '@mui/material/styles';

import ReactStars from 'react-rating-stars-component';

import Box from '@mui/material/Box';

StarComponent.propTypes = {
	handleRating:PropTypes.func,
};

export default function StarComponent({ handleRating, ...other }){

	  return(
          <Box>
          	<ReactStars
          		onChange={e=>handleRating(e)}
          		{...other}
          		/>
          </Box>
	  	)
}
