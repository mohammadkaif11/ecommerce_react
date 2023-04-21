import React, { useState, useEffect } from "react";
import Nav from "../GlobalComponent/Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const ImageUrl ="https://www.shift4shop.com/2015/images/build-an-online-store/build-an-online-store.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);
  const [IsEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {}, [IsError]);

  const Signup = (event) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let payLoad = {
      Email: email,
      Password: password,
      Name: name,
    };
    axios
      .post("http://localhost:8080/api.user/signup", payLoad, config)
      .then((res) => {
        setIsEmailSent(true);
        setMessage("Email sent successfully please verfiy your email address before login");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          console.log("error", err.response.status);
          setIsError(true);
          setMessage(err.response.data.message);
        }
        if (err.response.status == 500) {
          console.log("error", err.response.status);
          setIsError(true);
          setMessage(err.response.data.message);
        }
      });

    console.log("email", email);
    console.log("password", password);
    event.preventDefault();
  };

  return (
    <>
      <Nav />
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
                  onClick={() => {
                    setIsError(false);
                  }}
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
            {IsEmailSent && (
              <div
                className=" alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <button
                  onClick={() => {
                    setIsError(false);
                  }}
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
          <form onSubmit={Signup}>
            <h3>Signup</h3>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="form-control"
                id="Name"
                aria-describedby="Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="form-control"
                id="Password"
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Signup" />
            <div>
              <Link className="link-main-black" to="/Signup">
                Admin Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
