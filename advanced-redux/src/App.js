import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
//import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true; //this is declared outside to avoid re-assigned on component re-render so that it will be set only on initial file load

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    /* const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
      const response = await fetch(
        'https://practice-app-fea6e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    } // this is to avoid sending data to the cart in the database during initial render

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }); */
    if (isInitial) {
      isInitial = false;
      return;
    } // this is to avoid sending data to the cart in the database during initial render
    if(cart.changed){ //by checking the changed state we can avoid this send data action from getting dispatched
    dispatch(sendCartData(cart));} //here we are not dispatching a action creator like how we did before by calling a reducer function
    //here we are calling a function that returns another function and redux not only accepts action object it also accepts function as action and execute the function
    //here we are passing a action dispatch as argument and there it will accepts this dispatch and inturn we can make other actions dispatch inside it
    //simply put we can use a function that returns a another function as action that is built in redux when using redux toolkit
  }, [cart, dispatch]);

  useEffect(()=> {
    dispatch(fetchCartData());
  },[dispatch]); //we can leave the dependency array empty and still it will work

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;