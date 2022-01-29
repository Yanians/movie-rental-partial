
import { useState, useRef } from 'react';

import ReactPlayer from 'react-player';

import PlayerControls from './PlayerControls';

// import { hot } from 'react-hot-loader';

import *as L from '../../../../lib';

const format=(seconds)=>{
   if(isNaN(seconds)){
    return '00:00';
   }

   const date =  new Date(seconds * 1000);

   const hh = date.getUTCHours();

   const mm = date.getUTCMinutes();

   const ss = date.getUTCSeconds().toString().padStart(2,"0");

   if(hh){
      return `${hh}:${mm.toString().padStart(2,"0")}:${ss}`;
   }

   return `${mm}:${ss}`;
};

export default function VideoTrailer(props){
    let  count = 0;
	const [state, setState ] = useState({
		playing:true,
		muted:true,
		volume:0.5,
		playbackRate:1.0,
		fullscreen:false,
		played:0,
		seeking:false,
	});

	const [timeDisplay, setTimeDisplay ] = useState("normal");

	const { playing, muted, volume, playbackRate, fullscreen, played, seeking } = state;

	const playerRef = useRef(null);

	const controlsRef = useRef(null);

    const playerContainerRef = useRef(null);
      
        const handleRewind=()=>{
        	playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
        };

        const handleFastForward=()=>{
        	playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
        };

        const handleMute=()=>{
        	setState({...state,muted:!state.muted})
        }

        const handlePlayPause=()=>{
           setState({...state, playing:!state.playing});
        }

        const handleVolumeChange=(e,newValue)=>{
          setState({
          	...state,volume:parseFloat(newValue / 100),
          	         muted:newValue === 0 ? true : false,
          });
        };

        const handleVolumeSeekUp=(e,newValue)=>{
          setState({
          	...state,volume:parseFloat(newValue / 100),
          	         muted:newValue === 0 ? true : false,
          });
        };

        const handlePlaybackRateChange=(rate)=>{
        	setState({...state, playbackRate:rate})
        };

        const toggleFullScreen=()=>{

		   L.screenfull.toggle(playerContainerRef.current);
        };

        const handleProgress =(changeState) => {
	        if(!state.seeking){
	          setState({ ...state, ...changeState });	
	        }
		};

        const handleSeekChange=(e,newValue)=>{
                setState({...state, played:parseFloat(newValue / 100)})
        };

        const handleSeekMouseDown=(e)=>{
           setState({...state,seeking:true})
        };

        const handleSeekMouseUp=(e,newValue)=>{
           setState({...state,seeking:false,})
             playerRef.current.seekTo(newValue / 100)
        };

        // const handleChangeDisplayFormat=()=>{
        // 	setState({...state,timeDisplayFormat:timeDisplayFormat==='normal' ?'remaining':'normal'})
        // }

         /*const handleMouseMove = () => {
            console.log("mousemove");
		    controlsRef.current.style.visibility = "visible";
		    count = 0;
		 };

		const hanldeMouseLeave = () => {
		    controlsRef.current.style.visibility = "hidden";
		    count = 0;
		};*/

const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";

const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";

const elapsedTime = timeDisplay === "normal" ? format(currentTime):`${format(duration - currentTime)}`;

const totalDuration = format(duration);

  return (
    <L.Containerui sm>
     <L.O sx={{width:450,height:290}}>
        <div/* onMouseMove={handleMouseMove} 
               onMouseLeave={hanldeMouseLeave} */
               ref={playerContainerRef} 
               style={{display:'flex',width:'100%',height:"100%", position:'relative'}}
        >   
         <ReactPlayer file attributes="video"
            ref={playerRef} width='100%' height='100%'
            url='/static/video-rental/shortclips.mp4'
            type="video/mp4"
            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
          />  
         <PlayerControls 
            // ref={playerContainerRef}
            videoTitle={'The Rising Sun'}
            onPlayPause={handlePlayPause} 
            playing={playing}
            muted={muted}
            volume={volume}
            onMute={handleMute}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRateChange}
            onToggleFullScreen={toggleFullScreen}
            fullscreen={fullscreen}
            played={played}
            onSeek={handleSeekChange}
		    onSeekMouseDown={handleSeekMouseDown}
		    onSeekMouseUp={handleSeekMouseUp}
		    elapsedTime={elapsedTime}
		    totalDuration={totalDuration}
		    // onChangeDisplayFornat={handleChangeDisplayFormat}
            />
        </div>                         
     </L.O>  
    </L.Containerui>  
 )
};

