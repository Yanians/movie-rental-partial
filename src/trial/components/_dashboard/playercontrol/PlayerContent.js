
import React from 'react';

import PropTypes from 'prop-types';

import cx from 'clsx';

import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';

// import styles from './VideoInfoContent.styles';

// const useDefaultStyles = makeStyles(styles, { name: 'VideoInfoContent' });

const VideoInfoContent = ( { useStyles, overline, heading, body, overlineProps, headingProps, bodyProps,  ...props } ) => {

  const css = useStyles(props);
  return (
    <>
      {overline && (
        <Typography
          component={'span'}
          {...overlineProps}
          className={cx(css.overline, overlineProps.className)}
        >
          {overline}
        </Typography>
      )}
      <Typography
        component={'h4'}
        {...headingProps}
        className={cx(css.heading, headingProps.className)}
      >
        {heading}
      </Typography>
      <Typography {...bodyProps} className={cx(css.body, bodyProps.className)}>
        {body}
      </Typography>
    </>
  );
};

VideoInfoContent.propTypes = {
  overline: PropTypes.node,
  heading: PropTypes.node,
  body: PropTypes.node,
  overlineProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  headingProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  bodyProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  useStyles: PropTypes.func,
};
VideoInfoContent.defaultProps = {
  overline: null,
  heading: null,
  body: null,
  overlineProps: {},
  headingProps: {},
  bodyProps: {},
  useStyles: /*useDefaultStyles*/null,
};

export default VideoInfoContent;