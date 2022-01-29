
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';

import ShopMoviesCard from './MoviesCard';

// ----------------------------------------------------------------------

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default function MoviesList({ movies, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3}>
          <ShopMoviesCard movies={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
