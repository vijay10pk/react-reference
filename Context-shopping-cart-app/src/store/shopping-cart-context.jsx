import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products";

export const  CartContext = createContext({
    items: [], //this will store the shopping cart items
    addItemToCart: () => {}, // we have exposed the function in the app.js so we have to mention here also
    updateItemQuantity: () => {}
}); //started the variable with uppercase because this will contain the other component inside

function shoppingCartReducer(state, action) //state is most recent latest snapshot of the state and action in the action dispatched by the reducer
{
    if(action.type === 'ADD_ITEM')
    {
        const updatedItems = [...state.items]; //you should not manipulate the old state directly so first you have to copy it like this
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
              id: action.payload,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            ...state, 
            //if we have state with multiple properties, we might want to spread and copy the value and store so that we don't lose the data
            items: updatedItems,
          };
    }

    if(action.type === 'UPDATE_ITEM')
    {
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    }
    return state;
}
export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
      }); //here along with the reducer function we also have to pass the initial value of the state which we are managing, 
      //here shopping cart state with an array of empty array items.
    
      function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId, // there is a JS feature that if the property name and value has the same name we can just use the value name directly
                amount
                //or
                /*
                productId: productId,
                amount: amount
                */
            }
        });
      }
    
      const ctxValue = {
        items: shoppingCartState.items, //the shoppingCart state can be changed by any component that uses the context
        addItemToCart: handleAddItemToCart, //exposing this function so that whichever component uses the context can access this function
        updateItemQuantity: handleUpdateCartItemQuantity
    }

      return <CartContext.Provider value={ ctxValue}>
      {/* now whichever components are enclosed in this wrapper will be able to access the states and function this context has access to */}
        {children}
      </CartContext.Provider>
}