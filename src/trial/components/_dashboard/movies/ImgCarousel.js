
import { useState, useEffect } from 'react';

import { Carousel } fro 'react-elastic-carousel';

import { Item } fro '@mui/material';


export default function MovieCarousel(props){
    
	   const { children, ...rest, } = props;

	  return(
         <Carousel itemToShow={4} {...rest} >
            {children}
         </Carousel>
	  	);
}

/*
children
node
required

className
string
""

style
object
{}

verticalMode
bool
false

isRTL
bool
false

pagination
bool
true

transitionMs
number
500

easing
string
"ease"

tiltEasing
string
"ease"

enableTilt
bool
true

itemsToShow
number
1

itemsToScroll
number
1

breakPoints
Array<{ "width": "number", "itemsToShow": "number", "itemsToScroll": "number" }>

initialActiveIndex
number
0

initialFirstItem
number
0

showArrows
bool
true

showEmptySlots
bool
false

disableArrowsOnEnd
bool
true

focusOnSelect
bool
false

autoTabIndexVisibleItems
bool
true

renderArrow
func

renderPagination
func

itemPosition
consts.START │ consts.CENTER │ consts.END
consts.CENTER

itemPadding
array
[0, 0, 0, 0]

outerSpacing
number
0

enableSwipe
bool
true

enableMouseSwipe
bool
true

preventDefaultTouchmoveEvent
bool
false

enableAutoPlay
bool
false

autoPlaySpeed
number
2000

onChange
func
noop

onNextStart
func
noop

onPrevStart
func
noop

onNextEnd
func
noop

onPrevEnd
func
noop

onResize
func
noop
*/