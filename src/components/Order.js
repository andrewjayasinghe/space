import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';
import CopyToClipboard from 'react-copy-to-clipboard';
import { access_token } from "../aws-token" 
import { TextField, Button } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
// TODO: Integrate unused Modal code to display URLs for a specific order, requires new //GET /orders/order_id endpoint

const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

function Order(props) {

  const [orders, setOrders] = useState([0]);

  useEffect(getSpecificOrders, [])
  // const folderName = "00" + props.customer_id.toString() + "-" + orders.order_id.toString();
  function getSpecificOrders() {
    axios.get(URL + '/orders/' + props.customer_id, {
      headers: {
        'x-api-key': access_token
      }
    })
    .then(function (response) {
      const newOrders = response.data
      newOrders.sort(function(a, b) {
        return a.order_id - b.order_id;
      });
      setOrders(newOrders);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function generateCodes(id, num, urls) {
    var folderName = "00" + props.customer_id.toString() + "-" + id.toString() + "-" + num.toString();
    
    let inputValues = "[";
    for (let i in urls) {
      inputValues += "[" + urls[i] + "],"
    }
    inputValues += "[null]]"
    
    document.getElementById('outputFolderName').value = folderName;
    document.getElementById('inputTextValues2').value = inputValues;

    document.getElementById('template').submit();
    // console.log(inputValues);
  }

  function deleteOrder(event) {
    const order_id = event.target.id
    const creation_date = orders.find(order => order.order_id == event.target.id).creation_date
    const confirmDelete = window.confirm(`Are you sure you want to delete Order ${order_id}?`)
    if (confirmDelete == true) {
      axios.delete(URL + '/orders/', {
        data: {
          order_id: order_id,
          creation_date: creation_date
        },
        headers: {
          'x-api-key': access_token
        }
      })
      .then(function (response) {
        if (response.status == 200) {
          const newOrders = orders.filter((order) => {
            return order != orders.find(order => order.order_id == order_id)
          })
          setOrders(newOrders);
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  const orders_list = (
    <div style={{marginRight:"auto", marginLeft:"auto", width:"700px"}}>
    <table className="table table-bordered table-sm  hover">
      <thead className="thead-green">
        <tr>
          <th className="text-center left_radius">Order ID</th>
          <th className="text-center">Status</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Date Created</th>
          <th className="text-center"></th>
          <th className="text-center right_radius"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) =>
          <tr key={index}>
            <td className="text-center">{order.order_id}</td>
            <td className="text-center">{order.status}</td>
            <td className="text-center">{order.num_urls}</td>
            <td className="text-center">{String(order.creation_date).slice(0, 10)}</td>
            {/* <td className="text-center"><CopyToClipboard text={order.urls ? order.urls.join("\n") : ""}><a className="btn btn-primary btn-theme">Copy URLs</a></CopyToClipboard></td> */}
            
            <td className="text-center"><Button onClick={()=>{generateCodes(order.order_id, order.num_urls, order.urls)}} variant="outlined" color="primary" style={{height:"35px", backgroundColor:"#00B060", color:"white"}} endIcon={<AutorenewIcon />}>Generate</Button> 
            </td>
            {/* <td className="text-center"><a className="btn btn-primary btn-theme" onClick={()=>{generateCodes(order.order_id, order.num_urls, order.urls)}}>Generate</a></td> */}
            <td className="text-center"><button id={order.order_id} onClick={deleteOrder}>Delete</button></td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    );
  return (
        <ul>
          <form id="template" method="POST" action="http://ec2-34-219-23-64.us-west-2.compute.amazonaws.com/upload_manual2.php" target="_blank">
            <input type="hidden" name="outputFolderName" id="outputFolderName"></input>
            <input type="hidden" name="inputTextValues2" id="inputTextValues2"></input>
            {/* <input type="submit" value="Submit"></input> */}
          </form>
            {orders_list}
            {/* <input type="button" onClick={()=>{console.log(folderName)}}/> */}
        </ul>
    );
}

export default Order;