import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Content/Login.css";
import Nav from "../GlobalComponent/Nav";

function Login() {
  const navigate = useNavigate();
  const ImageUrl ="https://www.shift4shop.com/2015/images/build-an-online-store/build-an-online-store.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);

  const Login = (event) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let payLoad = {
      Email: email,
      Password: password,
    };
    axios
      .post("http://localhost:8080/api.user/login", payLoad, config)
      .then((res) => {
        const token=res.data.data;
        const role=res.data.role;
        const IsVerify=res.data.IsVerify;
        if(IsVerify==false){
          setIsError(true)
          setMessage("Please verify your email before logging")
        }
        if(token!=null && IsVerify){
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("name", res.data.Name);
          navigate('/');
        }
      })
      .catch((err) => {
        if(err.response.status==400){
          console.log('error', err.response.status)
          setIsError(true);
          setMessage(err.response.data.message)
        }
        if(err.response.status==500){
          console.log('error', err.response.status)
          setIsError(true);
          setMessage(err.response.data.message)
        }
      });

    console.log("email", email);
    console.log("password", password);
    event.preventDefault();
  };

  return (
    <>
    <Nav/>
    <div className="row content-Main">
      <div className="container1">
        <img src={ImageUrl} alt={ImageUrl} />
      </div>
      <div className="container2">
        <div className="content">
          {IsError && (
            <div
              className=" alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <button
                onClick={()=>{setIsError(false);}}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {message}
            </div>
          )}
        </div>
        <form onSubmit={Login}>
          <h3>Login</h3>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="form-control"
              id="Email"
              aria-describedby="Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="form-control"
              id="Password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
          <div>
            {/* <a className="link-main-red" href="/user/ForgetPasswordEmail">
              Forget Password?
            </a>
            <br /> */}
            <Link className="link-main-black" to="/Login">
              Admin Login
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
