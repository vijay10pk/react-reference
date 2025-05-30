
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  

  return (
    //Provider property is created by react that will make the context available to other components
    //value prop should be set to some default value orelse the app will break because in context we have passed item: [] as default value so it will be expecting the same
    <CartContextProvider>
      <Header/>
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}/>
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
