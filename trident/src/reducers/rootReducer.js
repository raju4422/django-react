import { combineReducers } from "@reduxjs/toolkit";
import common from "./common";
import setUser from "./setUser";

const rootReducer = combineReducers({common,setUser});

export default rootReducer;