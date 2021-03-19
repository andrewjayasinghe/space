import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import awsconfig from '../aws-exports';


// This component uses props to find the currently searched/displayed customer then uses that customer ID to make new orders

function CreateOrder(props) {

    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

    
function createOrder(num_urls) {
    axios.post(URL + '/orders', 
      {
      customer_id: props.data[0].customer_id,
      num_urls: parseInt(num_urls),
      })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };



      function handleSubmit(e) {
        console.log(e.target[0].value);
        const num_urls = e.target[0].value
        e.preventDefault();
        createOrder(num_urls);
    }
    return (
        <div>
           <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Create new order
        </label>
      </h2>
       <form onSubmit={handleSubmit}>
        <ul style={{textAlign:"center"}}>
        <li>
        <input
          className="inputField"
          type="number"
          name="num_urls"
          autoComplete="off"
          placeholder="256"
          pattern="[0-9]+"
        />
        </li>
        <Button
        type="submit" variant="danger">
          Create Order
        </Button>
        </ul>
    </form>
      
       </div>
    );
}

export default CreateOrder;