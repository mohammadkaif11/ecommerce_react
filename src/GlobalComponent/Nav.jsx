import React from 'react'
import AuthNavbar from '../Component/AuthNavbar';
import Navbar from '../Component/Navbar';
function Nav() {
    const token = localStorage.getItem("token");
  return (
    <><nav>{token != null ? <AuthNavbar /> : <Navbar />}</nav></>
  )
}

export default Nav