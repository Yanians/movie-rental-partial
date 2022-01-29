
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';

import { styled, makeStyles } from '@mui/styles';

import { alpha } from '@mui/material/styles';

import VideoTrailer from './VideoTrailer';

import *as L from '../../../../lib';

import *as W from '../../../../lib';

{/*
 * @Row and Col is the directives from Grid Component in Material-UI
 * 
 */}

const Root = styled(L.O)(({ theme })=>({
	display:'flex',
	width:'100%',
    flexWrap:'wrap',
    backdropFilter:'blur(16px)',
    WebkitBackdropFilter:'blur(16px)',
    backgroundColor:alpha(theme.palette.common.white,0.75),
}));

const Divider = props=><L.Divider {...props} />

const Description = L.AbstractGlobal(props=><L.Typography {...props} />);

const Paper = styled(props=>{
	 return <L.Paper {...props}/>
	})(({ theme })=>({
   padding:theme.spacing(2),
   // background:alpha(theme.palette.common.black,0.15),
}));

VideoParentComponent.propTypes = {
	video:PropTypes.node,
	contentArea:PropTypes.node,
	commentSection:PropTypes.node,
};

export default function  VideoParentComponent({video, commentSection, formArea, }){

	const handleFucos=()=>{

	}

  return <Root sx={{p:1,flexGrow:1}}>
	          <L.Row container s1 sm1 m1 jstart astart>
		       	     <L.Col item x12 sm8 m8>
		       	        <Paper variant="outlined">
		       	            <L.Row container s2 sm1 m1 column>

		       	            	<L.Col auto>
		       	            		{video}
		       	            		<VideoTrailer />
		       	            	</L.Col>

		       	            	<L.Col auto>
		       	            	   <Paper variant="outlined" square>

	       	            	         <L.Row container x1 jstart astart column>
	       	            	        	<L.Col auto>
	       	            	        	   <Description italic>
	       	            	                Title goes here...
	       	            	                this is so long sentense to demonstrate descriptin of the video in its core concept about the content. while typing on this text its very important to understand\
	       	            	                that this is just the demo  concept of the,
	       	            	                this is so long sentense to demonstrate descriptin of the video in its core concept about the content. while typing on this text its very important to understand\
	       	            	                that this is just the demo  concept of the,  
	       	            	                this is so long sentense to demonstrate descriptin of the video in its core concept about the content. while typing on this text its very important to understand\
	       	            	                that this is just the demo  concept of the, 
	       	            	                this is so long sentense to demonstrate descriptin of the video in its core concept about the content. while typing on this text its very important to understand\
	       	            	                that this is just the demo  concept of the,
	       	            	               </Description>  
	       	            	            </L.Col>

	       	            	            <Divider sx={{m:2}} />

{/****************************************** REACTION SECTION *********************************************************************/}

	       	            	        	<L.Col auto>
	       	            	        	    <L.Row container x1 aend jend>	        	
		                                        <L.Col auto>
			       	            	        	   <W.Ib small secondary>
			       	            	        	      <W.ThumbUpAltIcon variant="outlined"/>
			       	            	        	   </W.Ib>1k&nbsp;  
			       	            	        	    <W.Ib small primary>
			       	            	        		  <W.ThumbDownAltIcon />
			       	            	        	   </W.Ib>dislike&nbsp;  
			       	            	        	   <W.Ib small primary>
			       	            	        		  <W.RiSharedForwardLine />
			       	            	        	   </W.Ib>&nbsp;share
			       	            	        	</L.Col>
			       	            	        </L.Row> 		        	   
	       	            	        	</L.Col>

	       	            	        	<Divider sx={{m:2}} />

{/****************************************** COMMENTS SECTION *********************************************************************/}

	       	            	        	<L.Col auto>351 comments 
                                          &nbsp;<W.Ib small>
	       	            	        	    <W.SortIcon />
                                          </W.Ib>&nbsp;sort by 
                                        </L.Col>  
                            
                                        <L.Col auto>
                                          <Paper sx={{border:'1px solid grey'}}>
                                           <L.Row container x1 sm1 m1 l1 xl1 jstart astart>
                                              <L.Col x1>
                                               <L.O sx={{pt:4.5,pr:1}}><L.Avatar sx={{width:35,height:35}} alt="profile-iamge" src={'/static/video-rental/images/movie_4.png'} /></L.O>
                                              </L.Col>
	                                              <L.Col auto>
	                                                 <L.Inputfield 
	                                                 text 
	                                                 id="standard-required"
	                                                 standard 
	                                                 v={null} 
	                                                 normal
	                                                 onFocus={e=>handleFucos(e.target)} 
	                                                 label="Add public comment"
	                                                 fullWidth
	                                                 />
	                                               </L.Col>    	
                                           </L.Row>      
                                         </Paper>
                                        </L.Col>                                             
	       	            	         </L.Row>

		       	            	   </Paper>
		       	            	</L.Col>
		       	            </L.Row>
		       	        </Paper>
		       	     </L.Col>      
		             <L.Col item x12 sm4 m4>
		                <Paper variant="outlined">
		                  {formArea}
		       	        </Paper>
		       	     </L.Col>      
	          </L.Row> 
         </Root>  
}