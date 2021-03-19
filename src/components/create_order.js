import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import awsconfig from '../aws-exports';
import "../styles/create_order.css";

// This component is tied with the CreateOrder component to select a customer ID then make orders for it

function Customer(props) {
  let customer_id = "";
  if (props.location.query){
    customer_id = parseInt(props.location.query.customer_id);
  } else {
    customer_id = "Unknown";
  }
    const [customers, setCustomers] = useState([0]);
    const [phone, setPhone] = useState([0]);
    const [email, setEmail] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;



    useEffect(() => {
      setCustomers([0]);
    }, []);


    function postOrder(e){
      
      e.preventDefault();
      axios.post(URL + '/orders', 
        {
        customer_id: customer_id,
        num_urls: parseInt(e.target[1].value),
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


const customers_list = customers.map(customer => (
  <>
<div className="container-fluid wrapper">
  <div className="container">
  <form onSubmit={postOrder} className="orderForm bg-light">
    <div className="form-row">
      <div className="form-group col text-center">
      <h2>Submit an Order</h2>
      </div>
    </div>
      <div className="form-row">
        <div className="form-group col">
          <p>Customer Name:</p>
        </div>
        <div className="form-group col text-center">
          <p>{customer.contact_name}</p>
        </div>
      </div>
      <div className="form-row">
      <div className="form-group col-3">
          <p>Customer Contact:</p>
      </div>
      <div className="form-group col-3 text-center">
        <p>{phone}</p>
      </div>
      <div className="form-group col-3 text-center">
        <p>{email}</p>
      </div>
      <div className="form-group col-3 text-center">
      </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <p>Delivery Method:</p>
        </div>
        <div className="form-group col text-center">
        <select id="inputDelivery" class="form-control" disabled>
          <option selected>Shipping</option>
          <option>Pick Up</option>
        </select>
        </div>
        <div className="form-group col text-center">
          <p>Quantity:</p>
        </div>
        <div className="form-group col text-center">
        <input className="form-control"
          type="text"
          name="quantity"
          autoComplete="off"
          pattern="[0-9]+"
          ></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <p>Received Via:</p>
        </div>
        <div className="form-group col text-center">
        <select id="inputReceived" class="form-control" disabled>
          <option selected>Phone</option>
          <option>Email</option>
        </select>
        </div>
        <div className="form-group col text-center">
          <p>QR Design:</p>
        </div>
        <div className="form-group col text-center">
        <input type="text" class="form-control" id="inputQR" disabled></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-12 text-center">

      <textarea class="form-control" rows="3" disabled>Notes</textarea>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col text-center">
          <p>Date Received:</p>
        </div>
        <div className="form-group col text-center">
        <input type="text" class="form-control" disabled></input>
        </div>
        <div className="form-group col text-center">
          <p>Received By:</p>
        </div>
        <div className="form-group col text-center">
        <input type="text" class="form-control" disabled></input>
        </div>
        <div className="form-group col text-center">
          <p>Employee ID:</p>
        </div>
        <div className="form-group col text-center">
          <input type="text" class="form-control" disabled></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col text-center">
          <button type="submit" className="btn btn-primary btn-green">Submit</button>
        </div>
        <div className="form-group col text-center">
          <button type="submit" className="btn btn-primary">Cancel</button>
        </div>
      </div>
  </form>
  </div>
</div>

</>
));

  function readData() {
    if (customer_id !== "Unknown"){
      axios.get(URL + '/customers/' + customer_id, 
        {
        "customer_id": customer_id 
        })
      .then(function (response) {
        setCustomers([response.data.Item])
        setPhone([response.data.Item.contact_person.phone])
        setEmail([response.data.Item.contact_person.email])
        })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      setCustomers([{contact_name:"Unknown"}])
      setPhone(["Unknown"])
      setEmail(["Unknown"])
    }
}
    readData()
    return (   
      <>
      {customers_list}
      </>
    );
}
    
export default Customer;