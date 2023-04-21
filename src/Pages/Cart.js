import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Content/cart.css";
import { useNavigate } from "react-router-dom";
import Nav from "../GlobalComponent/Nav";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);

  useEffect(() => {
    getCart();
  }, [IsError]);

  //get Cart 
  const getCart = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:8080/api.product/GetCartdata", config)
      .then((res) => {
        setCart(res.data.Cart);
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //get product by Id
  const getProductbyId = (Id) => {
    navigate(`/product/${Id}`);
  };

  //Increment product
  const addingproduct = (Id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/updateAddCart/${Id}`, config)
      .then((res) => {
        if(!res.data.IsUpdateSuccess) {
          setIsError(true)
          setMessage(res.data.Msg)
        }
        getCart();
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //decrement product 
  const removingproduct = (Id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/updateRemoveCart/${Id}`, config)
      .then((res) => {
        console.log(res.data);
        getCart();
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //remove form cart
  const removefromcart = (Id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/RemoveCart/${Id}`, config)
      .then((res) => {
        getCart();
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  return (
    <>
      <Nav />
      <div className="container mx-2 my-2">
        <div className="orderContainer">
          <button className="btn btn-primary">Placed Order</button>
          <hr />
        </div>
      </div>
      <div className="container">
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
        <div className="row container-fluid" id="showCart">
          {cart.length > 0 &&
            cart.map(function (element, index) {
              return (
                <div className="col-3  my-2" key={index}>
                  <div className="card">
                    <img
                      height="300px"
                      width="200px"
                      src={element.ImageUrl}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Name:${element.ProductName}
                      </h5>
                      <span>Price:${element.ProductPrice}</span>
                      <span>Quantity:${element.UserQuantity}</span>
                      <br />
                      <span>stock:${element.Quantity}</span>
                      <div className="row">
                        <button
                          onClick={() => {
                            addingproduct(element.Id);
                          }}
                          className="btn btn-primary my-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            removingproduct(element.Id);
                          }}
                          className="btn btn-primary my-1"
                        >
                          -
                        </button>
                      </div>{" "}
                      <div className="row">
                        <button
                          onClick={() => {
                            getProductbyId(element.Id);
                          }}
                          className="btn btn-primary my-1"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            removefromcart(element.Id);
                          }}
                          className="btn btn-primary my-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Cart;
