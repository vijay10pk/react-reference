import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
        <div>Home</div>
        <p>Go to <Link to="/products">to list of products</Link></p>   {/*this works line anchor tag <a> but instead of reloading the page it will just load the component needed*/}
    </>
  )
}
