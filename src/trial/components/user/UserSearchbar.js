
import { Icon } from '@iconify/react';

import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import * as actionTypes from '../../redux';

import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import RefreshIcon from '@mui/icons-material/Refresh';

import Input from '@mui/material/Input';

import *as W from '../../../lib';

import {
  Box,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
  Typography,
  Stack,
  Avatar,
  Zoom,
} from '@mui/material';

import { movies } from '../../_db_';

const Title = W.AbstractGlobal(Typography);
const APPBAR_MOBILE = 64;

const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

 function Searchbar(props) {

  const [isOpen, setOpen] = useState(false);

  const [ state, setState ] = useState({
     searchKey:'',
  });

  const {searchKey } = state;

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterSearch =(e) => {
    props.dispatch(actionTypes.SearchData(e.target.value));
  }

  const handleChange=(inputValue)=>{
    console.log(inputValue);
  };

  return (
         <ClickAwayListener onClickAway={handleClose}>
           <div>
              {!isOpen && (
                <IconButton onClick={handleOpen}>
                  <Icon icon={searchFill} width={20} height={20} />
                </IconButton>
              )}
             <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
              <SearchbarStyle>
                <Input
                  onChange={(e)=>filterSearch(e)}
                  autoFocus
                  fullWidth
                  // value={searchKey}
                  disableUnderline
                  placeholder="Search movie..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                />
                <Button variant="contained" onClick={handleClose}>
                  Search
                </Button>
              </SearchbarStyle>
            </Slide>
      </div>    
    </ClickAwayListener>                 
  );
}

const mapStateToProps=(state)=>{
   return {
    search:state.Movies,
   }
}

export default connect(mapStateToProps)(Searchbar);
