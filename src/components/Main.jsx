import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Main = ({ authenticated, onUserSelect }) => {

  return (
    <>
      <Navbar authenticated={authenticated} onUserSelect={onUserSelect} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Main