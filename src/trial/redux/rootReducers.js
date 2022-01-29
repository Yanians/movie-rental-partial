import {
 Movies,
 NameTag,
 // HighLowMovies,
 } from './reducers';
 
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	 Movies,
	 NameTag,
	 // HighLowMovies,
});

export default rootReducer;