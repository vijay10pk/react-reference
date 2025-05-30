import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://practice-app-fea6e-default-rtdb.firebaseio.com/cart.json'); //by default this will be GET call

            if(!response.ok) {
                throw new Error('Failed to fetch cart data');
            }

            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        }
        catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Fetching cart data failed!',
                })
              );
        }
    }
}

//action creator function - that returns another function as action - that is handled by redux toolkit
export const sendCartData = (cart) => {
  //return { type: '', payload: } //so far action creators have been created by redux we never wrote i,e the reducer functions
  return async (dispatch) => {
    //but we can write a function that return another function that receive dispatch function as argument then inside we can dispatch actual action
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );


    const sendRequest = async () => {
      const response = await fetch(
        "https://practice-app-fea6e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
        //   body: JSON.stringify(cart), //here cart data will be store in the same format of initial state {items:[],totalQuantity:}
          body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}) //this is to avoid changed state from storing in DB
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    }; //this extra nesting of api fetch is required because we can execute it to make the fetch API work
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};