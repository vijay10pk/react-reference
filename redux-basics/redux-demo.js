const redux = require('redux');
//reducers - are pure functions that will accepts two inputs old state + dispatched action  and output is new state object
const counterReducer = (state = { counter: 0 }, action) => { //there should be a default state value when the store is created for the first time
    if(action.type === 'increment')
    { //this will execute only when action type is increment
        return {
            counter: state.counter+1 //accessing old counter state value and updating it
        }; //without if statement initial state when store is created will be 1
    }
    if(action.type === 'decrement')
    {
        return {
            counter: state.counter - 1
        }
    }

    return state; //else just return the state unchanged(default)
};

//store - to manage some data which are managed by reducer which will dispatch a action and reducer will execute when a store is created for the first time
const store = redux.createStore(counterReducer); //we should pass the reducer function to let store know which reducer is responsible for changing that state 

//subscriber
const counterSubscriber = () => {
   const latestState = store.getState(); //inbuilt method that gives latest state snapshot after it was updated
   console.log(latestState); //here after action dispatch the counter will 2 because initial state will be 1 when store created because the reducer will be called
};

store.subscribe(counterSubscriber); //we have to point at the subscriber function which will be executed by the redux, we are not executing the subscriber

store.dispatch({ type: 'increment' }); //dispatch is inbuilt method that dispatch action and action is a object with type property, which should be unique referring the action it performs
//the main purpose of action is to tell reducer what it should do when a action is dispatched.
store.dispatch({ type: 'decrement' });