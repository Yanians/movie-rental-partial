
import PropTypes from 'prop-types';

import { useState, useRef } from "react";

import { findDOMNode } from 'react-dom';

import Typography from "@mui/material/Typography";

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';

import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

import Popover from "@mui/material/Popover";

import Slider from "@mui/material/Slider";

import IconButton from "@mui/material/IconButton";

import Tooltip from "@material-ui/core/Tooltip";

import *as L from '../../../../lib';

const VideoTitle = L.AbstractGlobal(Typography);

const ControlsWrapper = styled(props=>{
  return <div {...props} />
})(({ theme })=>({
   // visibility:'hidden',
    position: "absolute",
    height:'100%',
    top: 0,
    left:0,
    right:0,
    bottom:0,
    background: "rgba(0,0,8,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

const FullScreenbtn = styled(props=>{
  return <IconButton {...props}/>
})(({theme})=>({
   color: "#999",
    "&:hover": {
      color: "#fff",
    },
    [theme.breakpoints.up('sm')]:{
      marginLeft:theme.spacing(50)+8,
    },
}));


const BottonIcons = styled(props=>{
	return <IconButton {...props}/>
})(({theme})=>({
	 color: "#999",
    "&:hover": {
      color: "#fff",
    },
}));

const ElapsedTimeBtn = styled(props=>{
	return <Button {...props} />
})(({theme})=>({
	  color: "#999",
    "&:hover": {
      color: "#fff",
    },
}));

const StyledButton = styled(props=>{
  return <Button {...props} />
})(({theme})=>({
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
}));

const ControlIcons = styled(props=>{
	return <IconButton {...props} />
})(({theme})=>({
   // display:'flex',
	 color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    }  
}));

const VolumeSlider = styled(props => {
       return <Slider {...props} />
})(({theme})=>({
			width:100,
}));


const PrettoSlider = styled(props=>{
	return <Slider {...props} />
})({

  root: {
    // display:'flex',
    height: 8,
  },

  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});


function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
};


PlayerControls.propTypes = {
  onPlayPause:PropTypes.func,
  playing:PropTypes.bool,
  muted:PropTypes.bool,
  played:PropTypes.bool,
  onMute:PropTypes.func,
  onRewined:PropTypes.func,
  onFastForward:PropTypes.func,
  onVolumeChange:PropTypes.func,
  onVolumeSeekDown:PropTypes.func,
  playbackRate:PropTypes.number,
  onPlaybackRateChange:PropTypes.func,
  volume:PropTypes.bool,
  videoTitle:PropTypes.string,
  onToggleFullScreen:PropTypes.func,
  onSeek:PropTypes.func,
  onSeekMouseUp:PropTypes.func,
  onSeekMouseDown:PropTypes.func,
  elapsedTime:PropTypes.number,
  totalDuration:PropTypes.number,
  onChangeDisplayFornat:PropTypes.func,
};

export default function PlayerControls(
  { 
    volume, 
    onPlayPause, 
    playing, 
    onRewind, 
    onFastForward, 
    muted, 
    onMute,
    onVolumeChange,
    onVolumeSeekUp,
    onPlaybackRateChange,
    playbackRate,
    onToggleFullScreen,
    videoTitle, 
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    onChangeDisplayFornat,
  }){

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "playbackrate-popover" : undefined;
  return (
    <ControlsWrapper>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item>
          <VideoTitle noWrap div h6 textContent={videoTitle} shadowwhite white fantasy instagram bold positive1 />
        </Grid>

          <Grid item>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<L.BookmarkIcon />}
            >
              Bookmark
            </StyledButton>
          </Grid>

      </Grid>

         <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
             
                <ControlIcons aria-label="required" onClick={onRewind}>
                  <L.FastRewindIcon fontSize="small" />
                </ControlIcons>

                <ControlIcons onClick={onPlayPause} aria-label="required">
                  {playing ? <L.PauseIcon  fontSize="small" /> : <L.PlayArrowIcon fontSize="small" />}
                </ControlIcons>

                <ControlIcons onClick={onFastForward} aria-label="required">
                  <L.FastForwardIcon fontSize="small" />
                </ControlIcons>
         </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: 10 }}
      >   
	        <Grid item xs={12}>
	          <PrettoSlider size="small"
	            min={0}
	            max={100}
	            value={played * 100}
	            ValueLabelComponent={(props)=><ValueLabelComponent {...props} value={elapsedTime} />}
              onChange={onSeek}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
	          />
	        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row">
            <BottonIcons onClick={onPlayPause}>
              {playing ? <L.PauseIcon fontSize="small" /> : <L.PlayArrowIcon fontSize="small" /> }
            </BottonIcons>

            <BottonIcons onClick={onMute}>
              {muted ? <L.VolumeOffIcon fontSize="small" /> : <L.VolumeUpIcon fontSize="small" /> }
            </BottonIcons>
	            <VolumeSlider size="small"
	              min={0}
	              max={100}
	              value={volume * 100}
                onChange={onVolumeChange}
                onChangeCommitted={onVolumeSeekUp}
	            />
            <ElapsedTimeBtn variant="text" style={{ color: "#fff", marginLeft: 16 }}>
              <Typography>{elapsedTime} / {totalDuration}</Typography>
            </ElapsedTimeBtn>
          </Grid>
        </Grid>

        <Grid item>

          <BottonIcons
            onClick={handlePopover}
            variant="text"
          >
            <Typography>{playbackRate}x</Typography>
          </BottonIcons>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}

                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}

              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <StyledButton onClick={()=>onPlaybackRateChange(rate)} variant="text">
                      <Typography color={rate === playbackRate ? "secondary":"default"}>{rate}x</Typography>
                    </StyledButton>
                  ))}
                </Grid>
             </Popover>
               <FullScreenbtn onClick={onToggleFullScreen}>
                  <L.FullScreenIcon fontSize="large" />
               </FullScreenbtn>
        </Grid>
      </Grid>
    </ControlsWrapper>
  );
};