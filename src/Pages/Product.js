import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import Nav from "../GlobalComponent/Nav";
import { useNavigate } from "react-router-dom";


function Product() {
  const navigate = useNavigate();

    const { id } = useParams()
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        getProduct();
    },[])
    
    
     //get product
    const getProduct = ()=>{
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
            })
            .catch((err) => {
              console.log("Error getting products ", err);
            });
    }

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

  return (
    <>
    <Nav/>
    <div className="container" style={{height:"80vh"}} >
    <h3 className="text-center display-5"><strong>Details of product-</strong></h3>
    {
        product.length > 0 && product.map((element) =>{
            return(
                <div className="center-card-div">
                <div className="card" style={{width:"20rem"}}>
                  <img height="300px" width="200px" src={element.ImageUrl} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Name:{element.ProductName}</h5>
                    <h3  style={{fontWeight:"bold"}}>Price:{element.ProductPrice}</h3>
                     <p><strong>Description:</strong>{ element.ProductDescription }</p>
                     <div className="but">
                        <button   onClick={() => {addCart(element.Id, element.UserId);}}  className="btn btn-primary">Add to Cart</button>
                        <Link to="/" className="btn btn-primary">Back</Link>
                     </div>
                  </div>
                </div>
              </div>
            )
        })
     }
  </div>
    </>
  )
}

export default Product