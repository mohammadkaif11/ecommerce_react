import React from "react";
import { Link ,useNavigate} from "react-router-dom";

function AuthNavbar() {
  const navigate = useNavigate();

  //get Name and role
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  }
  
  let role = localStorage.getItem("role");
  let name=localStorage.getItem("name");
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
            {
            role=="admin" &&
              <>
                <li className="nav-item">
                  <Link
                    style={{ color: "white" }}
                    className="nav-link active"
                    aria-current="page"
                    to="/Inventory"
                  >
                    Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ backgroundColor: "white", color: "#2874f0" }}
                    className="btn mx-2"
                    aria-current="page"
                    to="/bucket"
                  >
                    Bucket
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ backgroundColor: "white", color: "#2874f0" }}
                    className="btn mx-2"
                    aria-current="page"
                    to="/Transaction"
                  >
                    Transaction history
                  </Link>
                </li>
              </>
            }
             
            <li className="nav-item">
              <Link
                to="/checkOrder"
                className="btn mx-2"
                style={{ backgroundColor: "white", color: "#2874f0" }}
              >
                Check Order
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={()=>{logout()}} href="#" className="btn btn-secondary mx-2">
                Logout
              </button>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <div className="dropdown show" style={{ right: "30px" }}>
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {name}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to='/Cart'>
                  Cart
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
