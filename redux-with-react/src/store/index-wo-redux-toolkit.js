import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true} //if we have multiple states we can create something like this for better read ability 


const counterReducer = (state = initialState ,action) => {
    if(action.type ==='increment')
    {
        return {
            counter: state.counter+1,
            showCounter: state.showCounter //even though there is nothing to do with showCounter state here but still we have to pass the initialState because state won't be merged
            //if we don't mention the other state to their default it will set as undefined so we have to set the other state to default state because we overwrite the old state
            //we should never mutate the state we should always override the old state with new state because objects and arrays are reference in JS
        }
    }

    if(action.type === 'increase')
    {
        return {
            counter: state.counter+action.payload, //payload name should be same as the one used at dispatch
            //Here we are passing payload which we want to add with previous state which will passed along with type in action
            //we can give any name for payload; here I have given payload name as payload
            showCounter: state.showCounter
        }
    }

    if(action.type ==='decrement')
    {
        return {
            counter: state.counter-1,
            showCounter: state.showCounter
        }
    }
    
    if(action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter
        }
    }

    return state;
}
const store = createStore(counterReducer);


/*  We don't need these subscriber because, we can use react-redux to handle all the subscription 
const counterSubscriber = () => {
    const currentState = store.getState();
    console.log(currentState);
}
store.subscribe(counterSubscriber);

store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});
 */
export default store;