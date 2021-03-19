import React from "react";
import axios from 'axios';
import awsconfig from '../aws-exports';


// Currently unused component as client does not want full delete functionality

function DelCustomer(props) {

    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

    let config = {
        headers: {
          "Content-Type": "application/json",
                  }
        }

    function handleSubmit(e) {
        e.preventDefault();
      axios.delete(URL, 
        {
          params: {customer_id: e.target[0].value},
          headers: config.headers
        })
      .then(function (response) {
        console.log(response);
        document.getElementById("delForm").reset();
      })
      .catch(function (error) {
        console.log("ERROR", error);
        alert(error);
      });

    }
  return (
    <form id="delForm" onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Delete Customer
        </label>
      </h2>
      <ul>
          <li> Customer_id: 
      <input
        type="text"
        name="customer_id"
        autoComplete="off"
      ></input>
      </li>
      
      <button 
      type="submit">
        Delete
      </button>
      </ul>
    </form>
  );
}

export default DelCustomer;