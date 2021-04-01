import collectionReducer from "./collections";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    collectionReducer
});

export default allReducers;