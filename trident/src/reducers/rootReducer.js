import { combineReducers } from "@reduxjs/toolkit";
import common from "./common";
import setUser from "./setUser";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
  };
  
const rootReducer = combineReducers({common,setUser});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;