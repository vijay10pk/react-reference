import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); //we can navigate programmatically using useNavigate hook

  function navigateHandler()
  {
    navigate('/products');
  }
  return (
    <>
        <div>Home</div>
        <p>Go to <Link to="/products">to list of products</Link></p>   {/*this works line anchor tag <a> but instead of reloading the page it will just load the component needed*/}
        <p><button onClick={navigateHandler}>Navigate</button></p> {/*This is example for navigating programmatically we should use Link instead using button */}
    </>
  )
}
