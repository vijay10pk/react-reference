import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  return (
    <div>
      <MainNavigation></MainNavigation>
      <main>
        <Outlet/>
        {/* Outlet will tell react to load the children component here */}
      </main>
    </div>
  )
}

export default RootLayout