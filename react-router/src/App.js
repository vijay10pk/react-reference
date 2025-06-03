import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailsPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>, //when we enter a route path that doesn't exist the react dom will bubble the error to root element so we handle it here
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:productId", element: <ProductDetailsPage/>}
    ]
  }, //To make the routes wrap inside Main Navigation we created a parent component for route called root where we wrap the other routes as the children
  // there is a inbuilt component of react router dom which will tell where to load the child routes.
  // we can multiple root wrapper route component with different set of children
]);

// eslint-disable-next-line no-unused-vars
const routeDefinition = createRoutesFromElements(
  <Route>
   <Route path="/" element={<Home />} />,
  </Route>
); //we need to import createRoutesFromElements from react-router-dom



// const router = createBrowserRouter(routeDefinition) - in this way now we can use the above old syntax to load the routes but object syntax is the latest 
function App() {
  //now we have created a new component fo header called MainNavigation now if we want it to visible across all the page,
  //  we can to wrap the below one with MainNavigation component but for the Routes inside MainNavigation component to work we have to wrap it inside Route Provider
  return <RouterProvider router={router}/>; //RouterProvider will watch the URL and load the component based on the URL if that path is valid
}

export default App;

//in older version we used Route tags with path attributes inside the JSX
//<Route path="/"><Home/></Route> - like this
//in latest version createBrowserRouter is the best practice to do it.
//But we can still use the old syntax by using createRoutesFromElements