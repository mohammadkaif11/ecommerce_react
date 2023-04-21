import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#2874f0" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          FlipShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                style={{ color: "white" }}
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                AboutUs
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ color: "white" }}
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="btn mx-2"
                style={{ backgroundColor: "white", color: "#2874f0" }}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Signup"
                className="btn mx-2"
                style={{ backgroundColor: "white", color: "#2874f0" }}
              >
                Singup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
