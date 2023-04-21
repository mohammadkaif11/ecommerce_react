import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token') == undefined ){
        navigate('/login')
      }
    }, [])
    
    const {Component} = props;
  return (
    <Component/>
  )
}

export default ProtectedRoute