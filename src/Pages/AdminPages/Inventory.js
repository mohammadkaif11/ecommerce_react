import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../../Content/adminHomepage.css";
import Nav from "../../GlobalComponent/Nav";

function Inventory() {
  const navigate = useNavigate();
  
  const [Products, setProducts] = useState([]);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);

  useEffect(() => {
    getAdminProducts();
  }, []);

  //get admin Products
  const getAdminProducts = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:8080/api.product/Admin", config)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //get product by id
  const getProductbyId = (Id) => {
    navigate(`/adminproduct/${Id}`);
  };

  //delete products
  const deleteProduct = (Id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/AdmindeleteProduct/${Id}`, config)
      .then((res) => {
        getAdminProducts();
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //Change Status to active
  const ChangeStatus = (Id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:8080/api.product/AdminChangeStatus/${Id}`, config)
      .then((res) => {
        getAdminProducts();
      })
      .catch((err) => {
        console.log("Error getting products ", err);
      });
  };

  //file change handler
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  //Create Product
  const CreateProduct = () => {
    const formData = new FormData();
    formData.append("product-image", selectedFile);
    formData.append("ProductName", Name);
    formData.append("ProductPrice", Price);
    formData.append("ProductDescription", Description);
    formData.append("Quantity", Quantity);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .post("http://localhost:8080/api.product/AddProduct", formData, config)
      .then((res) => {
        getAdminProducts();
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

    console.log(selectedFile);
  };

  return (
    <>
      <Nav />
      <button
        type="button"
        className="btn btn-primary mx-2 my-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add NewProduct
      </button>
      <div className="row container-fluid">
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
        </div>
        {Products.length > 0 &&
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
                    </span>{" "}
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      Quanity:${product.Quantity}
                    </span>{" "}
                    <br />
                    {product.IsActive ? (
                      <>
                        <span className="active-span">Active</span> <br />
                      </>
                    ) : (
                      <>
                        <span className="Inactive-span">InActive</span>
                        <br />
                      </>
                    )}
                    <div className="button">
                      <button
                        className="btn btn-primary my-1"
                        onClick={() => {
                          getProductbyId(product.Id);
                        }}
                      >
                        Updates
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(product.Id);
                        }}
                        className="btn btn-primary my-1"
                      >
                        Delete
                      </button>
                      {!product.IsActive && (
                        <button
                          className="btn btn-primary my-1"
                          onClick={() => {
                            ChangeStatus(product.Id);
                          }}
                        >
                          Change Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form">
                <div className="mb-3">
                  <label htmlFor="ProductName" className="form-label">
                    Name
                  </label>
                  <input
                    required
                    name="ProductName"
                    type="text"
                    className="form-control"
                    id="ProductName"
                    aria-describedby="ProductName"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductPrice" className="form-label">
                    Price
                  </label>
                  <input
                    required
                    name="ProductPrice"
                    type="number"
                    className="form-control"
                    id="ProductPrice"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductQuantity" className="form-label">
                    Quanity
                  </label>
                  <input
                    required
                    name="Quantity"
                    type="number"
                    className="form-control"
                    id="ProductPrice"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductDescription" className="form-label">
                    Description
                  </label>
                  <input
                    required
                    name="ProductDescription"
                    type="text"
                    className="form-control"
                    id="ProductDescription"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFileSm" className="form-label">
                    Upload Images
                  </label>
                  <input
                    required
                    name="product-image"
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  CreateProduct();
                }}
              >
                Create{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
