
import {applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk]

const store = configureStore({reducer:rootReducer});

export default store;