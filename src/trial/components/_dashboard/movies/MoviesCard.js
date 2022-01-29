import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';

import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';

import StarComponent from '../../StarComponent';

import VideoPreview from '../../VideoPreview';

const MoviesImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

ShopMoviesCard.propTypes = {
  movies: PropTypes.object
};

export default function ShopMoviesCard({ movies }) {

  const { title, cover, price, imgPreview, status, priceRent, ratingValue } = movies;

  const handleRating= rating => {
      console.log(rating);
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'DVD' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <MoviesImgStyle alt={title} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
           <StarComponent handleRating={e=>handleRating(e)} value={ratingValue} size={20} activeColors="red" />
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <VideoPreview imgPreview={imgPreview} />
          <Typography variant="body2" sx={{textTransform:'uppercase'}}>
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceRent && fCurrency(priceRent)}
            </Typography>
            rent price:&nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

