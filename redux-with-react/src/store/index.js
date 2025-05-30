import { configureStore } from '@reduxjs/toolkit';
import  counterReducer  from './counter-slice';
import authReducer from './auth-slice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
}); //here we can use configureStore to create store and configure store with multiple slices
//we can map of reducers if we have multiple slices with reducers as reducer: {key:reducer}
//Here everything is merged together as one main reducer which is exposed to the store

//here we pass the reducers inside counterSlice to createStore which requires a reducers as argument


export default store;