
import { createStore, applyMiddleware  } from 'redux';

import { logger } from 'redux-logger';

import thunk from 'redux-thunk';

import { composeWithDevTools  } from 'redux-devtools-extension';

import  rootReducer  from './rootReducers';

const middleware = [thunk];

const initialState = {}

const store = createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware, logger)));

export default store;