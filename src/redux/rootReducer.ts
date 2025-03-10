import {combineReducers} from 'redux';
import movieSlice from "./slices/movieSlice.ts";

export const rootReducer = combineReducers({
    movies: movieSlice

});
