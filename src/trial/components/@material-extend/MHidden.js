import PropTypes from 'prop-types';

import { useMediaQuery } from '@mui/material';

MHidden.propTypes = {
	children:PropTypes.node,
	width:PropTypes.oneOf([
          'xsDown',
          'xsUp',
          'smDown',
          'smUp',
          'mdDown',
          'mdUp',
          'lgDown',
          'lgUp',
          'xlDown',
          'xlUp'
		]).isRequired
};

export default function MHidden({children, width}){
  
  const breakpoint = width.substring(0, 2);

  const hiddenup = useMediaQuery(theme=> theme.breakpoints.up(breakpoint));

  const hiddendown = useMediaQuery(theme=>theme.breakpoints.down(breakpoint));

     if(width.includes('Down')){
     	  return hiddendown ? null : children;
     }

     if(width.includes('Up')){
     	return hiddenup ? null : children;
     }

     return null;
}