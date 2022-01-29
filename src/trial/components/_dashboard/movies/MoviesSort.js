
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';

import { useState } from 'react';

import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';

import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'DVD', label: 'DVD' },
  { value: 'CD', label: 'CD' },
  { value: 'priceDesc', label: 'High-Low' },
  { value: 'priceAsc', label: 'Low-High' },
];

ShopMoviesSort.propTypes = {
 labeled:PropTypes.func.isRequired
};


export default function ShopMoviesSort(props) {

  const [open, setOpen] = useState(null);

  const [defaultEvent, setDefaultEvent ] = useState(null)

  const [label, setLabel] = useState('Newest');

        props.labeled(label,defaultEvent);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (event) => {
        setDefaultEvent(event);
      const textcontent = event.currentTarget.textContent;
      setOpen(null);
     switch(textcontent){

        case "Newest":{return setLabel("Newest");}

        case "Featured":{return setLabel("Featured");}

        case "High-Low":{return setLabel("High-Low");}
           
        case "Low-High":{return setLabel("Low-High");}

        case "DVD":{return setLabel("dvd");}

        case "CD":{return setLabel("cd");}

        case "All":{return setLabel("all");}

        default:{return setLabel("all")}
     }
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === 'newest'}
            onClick={e=>handleClose(e)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
