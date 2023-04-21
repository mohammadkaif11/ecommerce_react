import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../GlobalComponent/Nav";
import axios from "axios";

function AdminUpdatepage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  //get product
  const getProduct = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/GetById/${id}`, config)
      .then((res) => {
        setProduct(res.data.data);
        res.data.data.forEach((product) => {
          setName(product.ProductName);
          setDescription(product.ProductDescription);
          setPrice(product.ProductPrice);
          setQuantity(product.Quantity);
        });
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //update Product
  const UpdateProuduct = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    let payLoad = {
      ProductName: Name,
      ProductDescription: Description,
      ProductPrice: Price,
      Quantity: Quantity,
      _id: id,
    };
    axios
      .put(
        "http://localhost:8080/api.product/AdminUpdateProduct",
        payLoad,
        config
      )
      .then((res) => {
        setIsSuccess(true);
        setMessage(res.data.message);
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
  };
  
  return (
    <>
      <Nav />
      <div className="container" style={{ height: "80vh" }}>
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
        {IsSuccess && (
          <div
            className=" alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <button
              onClick={() => {
                setIsSuccess(false);
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
        <h3 className="text-center display-5">
          <strong>Details of product-</strong>
        </h3>
        {product.length > 0 &&
          product.map((element) => {
            return (
              <div className="center-card-div" key={element.Id}>
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    height="300px"
                    width="200px"
                    src={element.ImageUrl}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <label className="mx-2">Name</label>
                    <input
                      className="mx-2 my-1"
                      type="text"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />{" "}
                    <br />
                    <label className="mx-2">Price</label>
                    <input
                      className="mx-2 my-1"
                      type="number"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                    />{" "}
                    <br />
                    <label className="mx-2" style={{ fontSize: "10px" }}>
                      Description
                    </label>
                    <input
                      className="mx-2 my-1"
                      type="text"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    />{" "}
                    <br />
                    <label className="mx-2">Quantity</label>
                    <input
                      className="mx-2 my-1"
                      type="number"
                      value={Quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />{" "}
                    <br />
                    <div className="but">
                      <button
                        onClick={() => {
                          UpdateProuduct();
                        }}
                        className="btn btn-primary"
                      >
                        Updates
                      </button>
                      <Link to="/inventory" className="btn btn-primary">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AdminUpdatepage;
