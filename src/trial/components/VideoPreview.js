import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';

import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ImgStyle = styled('img')(({ theme }) => ({
  marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(3),
  height: theme.spacing(3),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`
}));

// ----------------------------------------------------------------------

VideoPreview.propTypes = {
  imgPreview: PropTypes.array.isRequired,
  limit: PropTypes.number
};

export default function VideoPreview({ imgPreview, limit = 3, ...other }) {
  const showPreview = imgPreview.slice(0, limit);

  const morePreview = imgPreview.length - limit;

  return (
    <RootStyle component="span" {...other}>
      {showPreview.map((preview, index) => (
        <ImgStyle key={index} sx={{ bgcolor: 'inherit' }} src={preview} alt={preview} />
      ))}

      {imgPreview.length > limit && <Typography variant="subtitle2">{`+${morePreview}`}</Typography>}
    </RootStyle>
  );
}
