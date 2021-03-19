import React, { useState, useEffect } from "react";
import axios from 'axios';
import awsconfig from '../aws-exports';
import { access_token } from "../aws-token" 
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

// TODO: Display URLs for a specific order on this page, requires new //GET /orders/order_id endpoint, could make the Order ID a link to URL list

function Orders() {
  
  const [customers, setCustomers] = useState([0])
  const [orders, setOrders] = useState([0])
  // const [mergedOrders, setMergedOrders] = useState([0])
  // const [filteredOrders, setFilteredOrders] = useState([0])
  const [data, setData] = useState([])
  // const [search, setSearch] = useState("")

  useEffect(getCustomers, [])
  useEffect(getOrders, [])
  useEffect(mergeCustomerOrder, [orders])
  // useEffect(sortOrders, [search])

  function getCustomers() {
    axios.get(URL + '/customers' , {
      headers: {
        'x-api-key': access_token
      }
    })
    .then(function (response) {
      const dbCustomers = response.data.Items
      setCustomers(dbCustomers)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function getOrders() {
    axios.get(URL + '/orders', {
      headers: {
        'x-api-key': access_token
      }
    })
    .then(function (response) {
      const dbOrders = response.data.Items
      setOrders(dbOrders)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function mergeCustomerOrder() {
    let customerIDs = customers.map((cusItem) => {
      return cusItem['customer_id']
    })
    let mergedListOfDict = []
    for (let orderItem of orders) {
      if (customerIDs.includes(orderItem.customer_id)) {
        let customerDict = customers[customerIDs.indexOf(orderItem.customer_id)]
        let ordCusDict = Object.assign({}, customerDict, orderItem)
        mergedListOfDict.push(ordCusDict)
      }
    }

    let modified_orders = [];
    for (let i in mergedListOfDict) {
      let temp_obj = {};
      temp_obj["order_id"] = mergedListOfDict[i].order_id
      temp_obj["customer_id"] = mergedListOfDict[i].customer_id
      temp_obj["name"] = mergedListOfDict[i].contact_name
      temp_obj["org"] = mergedListOfDict[i].org_name
      temp_obj["urls"] = mergedListOfDict[i].num_urls
      temp_obj["status"] = mergedListOfDict[i].cus_status
      temp_obj["date_created"] = String(mergedListOfDict[i].creation_date).slice(0, 10)
      temp_obj["last_updated"] = String(mergedListOfDict[i].lastupdate_date).slice(0, 10)
      temp_obj["urls_name"] = mergedListOfDict[i].urls
      modified_orders.push(Object.values(temp_obj))
    }
    setData(modified_orders)

    // let temp_orders = [];
    // for (let item in mergedListOfDict) {
    //   temp_orders.push(Object.values(mergedListOfDict[item]))
    // }


    // let modified_orders = [
    //   {
    //     "order_id": mergedListOfDict.order_id,
    //     "customer_id": mergedListOfDict.customer_id,
    //     "name": mergedListOfDict.contact_name,
    //     "org": mergedListOfDict.org_name,
    //     "urls": mergedListOfDict.num_urls,
    //     "status": mergedListOfDict.cus_status,
    //     "date_created": mergedListOfDict.creation_date,
    //     "last_updated": mergedListOfDict.lastupdate_date
    // }

    // ];
    // setMergedOrders(mergedListOfDict)
    // setFilteredOrders(mergedListOfDict)
  }

    const getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTableBodyRow: {
          root: {
            '&:nth-child(odd)': { 
              backgroundColor: 'lightgrey'
            }
          }
        },
        MUIDataTableBodyCell: {
        }
      }
    })

  const columns = [
  {
    name: "Order ID",
    options: {
      filter: true,
      sort: true,
      SortDirection: "desc",
    }
  },
  // {
  //   name: "Delete",
  //   options: {
  //     filter: false,
  //     sort: false,
  //     empty: true,
  //     customBodyRenderLite: (dataIndex) => {
  //       return (
  //         <button onClick={()=>{console.log(customers[dataIndex].customer_id)}}>
  //           More Info
  //         </button>
  //       );
  //     }
  //   }
  // }, 
  "Customer ID", "Name", "Organization", "# URLs", "Status", "Date Created", "Date Updated"];


  const options = {
    selectableRows: "none",
    sortOrder: {
      name: "Date Created",
      direction: "desc"
    }
    // expandableRows: true,
    // filterType: "dropdown",
    // responsive: "scrollMaxHeight",
    // expandableRowsHeader: false,
    // renderExpandableRow: (rowData, rowMeta) => {
    //   return (
    //       <div>
    //         {JSON.stringify(rowData)}
    //         {JSON.stringify(rowMeta)}
    //       </div>
    //       );
    //   }
  };

  // function sortOrders(){
  //   let newFilteredOrders = []
  //   if (search !== ""){
  //     mergedOrders.forEach(element => {
  //       if (element.customer_id.toString().padStart(4, '0').includes(search) || 
  //         element.order_id.toString().includes(search) || 
  //         element.org_name.toUpperCase().includes(search) ){
  //         newFilteredOrders.push(element)
  //       }
  //     }); 
  //     if (newFilteredOrders.length === 0){
  //       newFilteredOrders.push({customer_id:"No match found"})
  //     }
  //   } else {
  //     newFilteredOrders = mergedOrders
  //   }
  //   setFilteredOrders(newFilteredOrders);
  // }
  
  // function handleChange(e){
  //   setSearch(e.target.value.toString().toUpperCase())
  // }

  const orders_table = (
    <div className="container">
      {/* style={{width:"80%", marginLeft:"auto", marginRight:"auto"}} */}
        <div>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Orders"}
            data={data}
            columns={columns}
            options={options}
          />
          </MuiThemeProvider>
      </div>
      {/* <input type="button" value="Test" onClick={()=>{console.log(data)}}/> */}
    </div>
  )

  // const tmp = (
  //   <div>
  //     <br></br>
  //     <div className="row">
  //       <div className="col"></div>
  //       <div className="col-11">
  //         <div className="container-fluid">

  //           <div className="row">
  //             <div className="col-12">
  //               <div className="input-group input-group-md mb-3">
  //                 <div className="input-group-prepend">
  //                   <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
  //                 </div>
  //                 {/* <input onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Order ID or Customer ID or Organization"></input> */}
  //               </div>
  //             </div>
  //           </div>

  //           <br></br>

  //           <div className="row">
  //             <div className="col-12">
  //               <table className="table table-sm table-hover table-striped">
  //                 <thead className="thead-green">
  //                   <tr>
  //                     <th className="text-center">Order ID</th>
  //                     <th className="text-center">Customer ID</th>
  //                     <th className="text-center">Organization</th>
  //                     <th className="text-center"># URLs</th>
  //                     <th className="text-center">QR Design Code</th>
  //                     <th className="text-center">Status</th>
  //                     <th className="text-center">Date Created</th>
  //                     <th className="text-center">Date Updated</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>

  //                 {filteredOrders.map(order =>
  //                   <tr>
  //                     <td className="text-center">{order.order_id}</td>
  //                     <td className="text-center">{String(order.customer_id).padStart(4, '0')}</td>
  //                     <td className="text-center">{order.org_name}</td>    
  //                     <td className="text-center">{order.num_urls}</td>
  //                     <td className="text-center">Link to DB</td>
  //                     <td className="text-center">{order.status}</td>
  //                     <td className="text-center">{String(order.creation_date).slice(0, 10)}</td>
  //                     <td className="text-center">{String(order.lastupdate_date).slice(0, 10)}</td>
  //                   </tr>
  //                 )}
  //                 </tbody>
  //               </table>
  //             </div>
  //           </div>

  //         </div>
  //       </div>
  //       <div className="col"></div>
  //     </div>
  //   </div>
  // )

  
  return (
    <div style={{marginTop:"40px"}}>
    {orders_table}
    </div>
  );
}

export default Orders;