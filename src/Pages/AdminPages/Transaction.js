import React, { useState, useEffect } from "react";
import Nav from "../../GlobalComponent/Nav";
import axios from "axios";

function Transaction() {
  const [CustomerCancel, setCustomerCancel] = useState(false);
  const [YourCancel, setYourCancel] = useState(false);
  const [OrderDate, setOrderDate] = useState(null);
  const [page, setPage] = useState(1);
  const [Transaction, setTransaction] = useState([]);
  const [pagenav, setpagenav] = useState([]);

  //Change Page
  const ChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getTransaction();
  }, [CustomerCancel, YourCancel, OrderDate]);

  //get Transaction
  const getTransaction = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    let payLoad = {
      CustomerCancel: CustomerCancel,
      YourCancel: YourCancel,
      OrderDate: OrderDate,
    };

    axios
      .post(
        `http://localhost:8080/api.product/transactionhistory/${page}`,
        payLoad,
        config
      )
      .then((res) => {
        setTransaction(res.data.data);
        console.log(res.data)
        let arr = [];
        for (let i = 1; i <= res.data.pages; i++) {
          if (i == res.data.current) {
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

  return (
    <>
      <Nav />
      <div className="container mx-2 my-2">
        <div className="orderContainer">
          <h3 style={{ textAlign: "center" }} className="my-2">
            Your Transaction
          </h3>
          <hr />
        </div>
      </div>
      <div className="container">
        <table
          id="dtBasicExample"
          className="table table-striped table-bordered table-sm"
          cellspacing="0"
          width="100%"
        >
          <div>
            <thead>
              <tr>
                <th className="th-sm">OrderDate</th>
                <th className="th-sm">CustomerCancel</th>
                <th className="th-sm">YourCancel</th>
                <th className="th-sm">Submit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="date"
                    value={OrderDate}
                    onChange={(e) => {
                      setOrderDate(e.target.value);
                    }}
                    onch
                    name="OrderDate"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    value={CustomerCancel}
                    onChange={(e) => {
                      setCustomerCancel(!CustomerCancel);
                    }}
                    name="CustomerCancel"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    value={YourCancel}
                    onChange={(e) => {
                      setYourCancel(!YourCancel);
                    }}
                    name="YourCancel"
                  />
                </td>
              </tr>
            </tbody>
          </div>
        </table>
        <table
          id="dtBasicExample"
          className="table table-striped table-bordered table-sm"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th className="th-sm">Sno</th>
              <th className="th-sm">Transaction Update Date</th>
              <th className="th-sm">Order Date</th>
              <th className="th-sm">OrderId</th>
              <th className="th-sm">Amount</th>
              <th className="th-sm">Mode of Payment</th>
              <th className="th-sm">Status</th>
              <th className="th-sm">Message</th>
              <th className="th-sm">YourCancel</th>
              <th className="th-sm">CustomerCancel</th>
            </tr>
          </thead>
          <tbody>
            {Transaction.length > 0 &&
              Transaction.map((element, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <th>{element.Date}</th>
                    <th>{element.OrderDate}</th>
                    <th>{element.OrderId}</th>
                    <th>{element.TotalAmount}</th>
                    <th>{element.PaymentMode}</th>
                    {(() => {
                      if (
                        element.CustomerCancel == false &&
                        element.IsCancel == false
                      ) {
                        return (
                          <td
                            style={{ color: "white", backgroundColor: "green" }}
                          >
                            Order Success
                          </td>
                        );
                      } else {
                        return (
                          <td
                            style={{ color: "white", backgroundColor: "red" }}
                          >
                            Order Cancel
                          </td>
                        );
                      }
                    })()}
                    {(() => {
                      if (element.CustomerCancel == false) {
                        return <td>{element.Message}</td>;
                      } else {
                        return <td>Your have cancel order</td>;
                      }
                    })()}
                    {(() => {
                      if (element.IsCancel == true) {
                        return (
                          <td>
                            <input
                              onclick="return false;"
                              readonly
                              type="checkbox"
                              checked
                            />
                          </td>
                        );
                      } else {
                        return (
                          <td>
                            <input
                              onclick="return false;"
                              readonly
                              type="checkbox"
                            />
                          </td>
                        );
                      }
                    })()}
                    {(() => {
                      if (element.CustomerCancel == true) {
                        return (
                          <td>
                            <input
                              onclick="return false;"
                              readonly
                              type="checkbox"
                              checked
                            />
                          </td>
                        );
                      } else {
                        return (
                          <td>
                            <input
                              onclick="return false;"
                              readonly
                              type="checkbox"
                            />
                          </td>
                        );
                      }
                    })()}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
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

export default Transaction;
