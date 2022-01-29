
import PropTypes from 'prop-types';

import store from '../../../redux/store';

import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';

import { Form, FormikProvider } from 'formik';

import closeFill from '@iconify/icons-eva/close-fill';

import roundClearAll from '@iconify/icons-ic/round-clear-all';

import roundFilterList from '@iconify/icons-ic/round-filter-list';

import *as actionTypes from '../../../redux';

import {

  Box,

  Radio,

  Stack,

  Button,

  Drawer,

  Rating,

  Divider,

  Checkbox,

  FormGroup,

  IconButton,

  Typography,

  RadioGroup,

  FormControlLabel

} from '@mui/material';

import Scrollbar from '../../Scrollbar';

import ColorManyPicker from '../../ColorManyPicker';

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];

export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];

export const FILTER_CATEGORY_OPTIONS = ['Action', 'Drama','Comedy', 'Suspense','Horror','Cartoons'];

export const FILTER_RATING_OPTIONS = ['up5Star','up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $100' },
  { value: 'between', label: 'Between $100 - $200' },
  { value: 'above', label: 'Above $200' }
];

export const FILTER_COLOR_OPTIONS = ['#00AB55','#000000','#FFFFFF','#FFC0CB','#FF4842','#1890FF','#94D82D','#FFC107'];


MoviesFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object
};


export default function MoviesFilterSidebar( { isOpenFilter, onResetFilter, onOpenFilter, onCloseFilter, formik } ) {

  const [ priceOptions, setPriceOptions ] = useState('');

  const [ starOption, setStarOptions ] = useState('');

  const [ categories, setCategory ] = useState('');

  const [isChecked, setCheck ] = useState(false);

  const { values, getFieldProps, handleChange, touched } = formik;

  useEffect(()=>{

    switch(priceOptions || starOption || categories){

        case "below"    : store.dispatch({type:actionTypes.BELOW_100,});break;

        case "between"  : store.dispatch({type:actionTypes.BETWEEN_100_200,});break;

        case "above"    : store.dispatch({type:actionTypes.ABOVE_200,});break;

        case "up5Star"  : store.dispatch({type:actionTypes.FIVE_STAR,});break;

        case "up4Star"  : store.dispatch({type:actionTypes.FOUR_STAR,});break;

        case "up3Star"  : store.dispatch({type:actionTypes.THREE_STAR,});break;

        case "up2Star"  : store.dispatch({type:actionTypes.TWO_STAR,});break;

        case "up1Star"  : store.dispatch({type:actionTypes.ONE_STAR,});break;

        case "Action"   : store.dispatch({type:actionTypes.ACTION,});break;

        case "Drama"    : store.dispatch({type:actionTypes.DRAMA,});break;

        case "Comedy"   : store.dispatch({type:actionTypes.COMEDY,});break;

        case "Suspense" : store.dispatch({type:actionTypes.SUSPENSE,});break;

        case "Horror"   : store.dispatch({type:actionTypes.HORROR,});break;

        case "Cartoons"   : store.dispatch({type:actionTypes.CARTOONS,});break;

        default:return null;
    };

  },[ priceOptions, starOption,categories ]);

  const handlePriceRange=(price)=>{
         setStarOptions('');
         setCategory('');
         setPriceOptions(price)
         onCloseFilter();
  };

  const handleRating=(rating)=>{
         setPriceOptions('');
         setCategory('');
         setStarOptions(rating);
         onCloseFilter();
  };

   const handleCategory=(category)=>{
        console.log(category)
         setPriceOptions('');
         setStarOptions('');
         setCategory(category);
         onCloseFilter();
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
               {/* <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Gender
                  </Typography>
                  <FormGroup>
                    {FILTER_GENDER_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps('gender')}
                            value={item}
                            checked={values.gender.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>*/}

                <div>

                  <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Price
                  </Typography>
                  <RadioGroup {...getFieldProps('priceRange')}>
                    {FILTER_PRICE_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        onClick={e=>handlePriceRange(e.target.value)}
                      />
                    ))}
                  </RadioGroup>
                </div>

                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel 
                         key={item} 
                         value={item} 
                         control={<Radio />} 
                         label={'*'+item} 
                         onClick={e=>handleCategory(e.target.value)}
                         />
                    ))}
                  </RadioGroup>
                </div>

                 <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            onClick={e=>handleRating(e.target.value)}
                            color="default"
                            value={item}
                            icon={<Rating readOnly value={5 - index} />}
                            checkedIcon={<Rating readOnly value={5 - index} />}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '& > :first-of-type': { py: 0.5 },
                          '&:hover': {
                            opacity: 0.48,
                            '& > *': { bgcolor: 'transparent' }
                          },
                          ...(values.rating.includes(item) && {
                            bgcolor: 'background.neutral'
                          })
                        }}
                      />
                    ))}
                  </RadioGroup>
                </div>
{/*
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Colour
                  </Typography>
                  <ColorManyPicker
                    name="colors"
                    colors={FILTER_COLOR_OPTIONS}
                    onChange={handleChange}
                    onChecked={(color) => values.colors.includes(color)}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                </div>*/}

              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}