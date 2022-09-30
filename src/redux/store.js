import { configureStore } from '@reduxjs/toolkit';
import animeReducer from '../redux/reducer'

export default configureStore({
    reducer:{
        anime : animeReducer
    },
});