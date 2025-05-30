import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true} //if we have multiple states we can create something like this for better read ability 
//redux-toolkit 
//accepts an object as argument. we can make multiple slices of our states that go together to make the code maintainable
const counterSlice = createSlice({
    name: 'counter', //identifier(name) for the slice
    initialState: initialCounterState, //we have to state the initial state
    //redux-toolkit will automatically create action identifiers and action objects
    reducers: { //reducer is an object, a map that will have all reducers related to the states handled by this slice, here all the counter related
        increment(state) { //here we don't need actions because these functions will called based on what action is dispatched by the redux
            state.counter++; //here we are allowed(still not okay) to mutate the state, because redux toolkit internally use a library called immer which clone the state and create a new state
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) { //we can still pass actions but it's not necessary so we can pass payload here and use it inside the method
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions; 
//by exporting the actions here we can dispatch actions just by the name of the reducers inside the createSlice
//we don't need to worry about action identifier, redux-toolkit will take care of creating action identifier for example it we can access
//  toggleCounter like counterSlice.actions.toggleCounter
export default counterSlice.reducer;

