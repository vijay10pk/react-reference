import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
//we can useStore to directly access the store but useSelector can give access to part of our state managed by the store.

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  //the purpose useSelector is to access only the state that we require, this will be helpful when we have a lot of state managed in store.
  //useSelector accepts a function as parameter, here state will get counter(state.counter) in the store.
  //by using useSelector react-redux will automatically set a subscriber to the store so whenever the data changes in the redux store and update the component
  //it will also clear the subscription behind the scenes

  const showCounter = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };
  //we can use the dispatch function to send an action to the store. Here we are sending
  //two actions to the store, one for increment and one for decrement.

  const increaseHandler = () => {
    dispatch({ type: "increase", payload: 5 }); //payload name can be anything
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && (
        <>
          <div className={classes.value}>{counter}</div>
          <div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={increaseHandler}>Increase by 5</button>
            <button onClick={decrementHandler}>Decrement</button>
          </div>
        </>
      )}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/*FOR CLASS COMPONENTS
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
} //here map the state to the props i,e instead of useSelector above and can be accessed as this.props.counter
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({type: 'increment}),
    decrement: () => dispatch({type: 'decrement'})
  }
}; // we are mapping the actions to be dispatched i,e instead of useDispatch above and we can access them in the component like this.props.increment
//we have to use bind() in the place we call handler functions like onClick = {incrementHandler.bind()}

export default connect(mapStateToProps, mapDispatchToProps)(Counter) // Here we are using connect() from react redux for class-based components which accepts two arguments
*/
