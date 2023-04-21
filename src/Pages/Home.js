import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "../Content/cart.css";
import { useNavigate } from "react-router-dom";
import Nav from "../GlobalComponent/Nav";

function Home() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [Name, setName] = useState("");
  const [Products, setProducts] = useState(null);
  const [pagenav, setpagenav] = useState([]);

  useEffect(() => {
    getProducts();
  }, [page, Name, price]);

  //Change Page
  const ChangePage = (page) => {
    setPage(page);
  };

  //get Products
  const getProducts = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    let payLoad = {
      page: page,
      range: price,
      name: Name,
    };

    axios
      .post("http://localhost:8080/api.product/getProduct", payLoad, config)
      .then((res) => {
        setProducts(res.data.Data.products);
        let arr = [];
        for (let i = 1; i <= res.data.Data.pages; i++) {
          if (i == res.data.Data.current) {
            arr.push(
              <li
                key={i}
                onClick={() => {
                  ChangePage(i);
                }}
                className="page-item active"
              >
                <button className="page-link">{i}</button>
              </li>
            );
          } else {
            arr.push(
              <li
                key={i}
                onClick={() => {
                  ChangePage(i);
                }}
                className="page-item"
              >
                <button className="page-link">{i}</button>
              </li>
            );
          }
        }
        setpagenav(arr);
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //add Cart
  const addCart = (productId, adminId) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .get(
        `http://localhost:8080/api.product/addCart/${productId}?adminId=${adminId}`,
        config
      )
      .then((res) => {
        navigate('/Cart');
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //get products by Id
  const getProductbyId = (Id) => {
    navigate(`/product/${Id}`);
  };

  return (
    <>
      <Nav />
      <div className="col-3 my-2">
        <button
          className="btn btn-primary mx-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Filters Products
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <nav className="navbar bg-light border">
            <div className="input-group">
              <div>
                <label>ProductName</label>
                <input
                  width={350}
                  type="text"
                  name="Name"
                  placeholder="Search Product"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Maxmimum Price</label>
                <input
                  type="range"
                  name="Price"
                  width={250}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  max="100000"
                  step="200"
                  id="range"
                />
                <label id="demo">{price}</label>
              </div>
              <div className="common">
                <button className="btn btn-dark mx-1">Submit</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div
        className="row container-fluid"
        style={{ overflowX: "auto", height: "80vh" }}
      >
        {Products != null &&
          Products.map((product, index) => {
            return (
              <div className="col-3 my-2" key={index}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    height="300px"
                    width="200px"
                    src={product.ImageUrl}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{product.ProductName}</h5>
                    <span style={{ fontWeight: "bold" }}>
                      Price:${product.ProductPrice}
                    </span>
                    <div className="button">
                      <button
                        onClick={() => {
                          addCart(product.Id, product.UserId);
                        }}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          getProductbyId(product.Id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <nav className="Navbar" aria-label="Page navigation example">
          <ul className="pagination" id="pagerDiv">
            {pagenav.map((Element) => {
              return Element;
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Home;
