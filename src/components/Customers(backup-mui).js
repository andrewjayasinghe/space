import React, { useState, useEffect } from "react";
import axios from 'axios';
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import "../styles/Customers.css";
import { access_token } from "../aws-token" 
// import MUIDataTable from "mui-datatables";
// import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
// import { SortDirection } from "@aws-amplify/datastore";
const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;


function Customers() {

  // const getMuiTheme = () => createMuiTheme({
  //   overrides: {
  //     MUIDataTableBodyRow: {
  //       root: {
  //         '&:nth-child(odd)': { 
  //           backgroundColor: 'lightgrey'
  //         }
  //       }
  //     },
  //     MUIDataTableBodyCell: {
  //     }
  //   }
  // })

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  // const [data, setData] = useState([]);

  
  useEffect(sortCustomers, [search])

  function getCustomers() {
    axios.get(URL + '/customers' , {
      headers: {
        'x-api-key': access_token
      }
    })
    .then(function (response) {
      const dbCustomers = response.data.Items
      setCustomers(dbCustomers)
      console.log(dbCustomers)
      // let temp_data = [];
      // for (let i=0; i<dbCustomers.length; i++) {
      //   // temp_data.push(Object.values(dbCustomers[i]))
      //   let temp_data = [];
      //   for (let j=0; j<Object.values(dbCustomers[i]).length; j++) {
      //     if (typeof(Object.values(dbCustomers[i])[j]) == "string") {
      //       temp_data.push(Object.values(dbCustomers[i])[j])
      //     } else if (typeof(Object.values(dbCustomers[i])[j]) == "object") {
      //       for (let k=0; k<Object.values(Object.values(dbCustomers[i])[j]).length; k++) {
      //         temp_data.push(Object.values(Object.values(dbCustomers[i])[j])[k])
      //       }
      //     } else if (typeof(Object.values(dbCustomers[i])[j]) == "number") {
      //       temp_data.unshift(Object.values(dbCustomers[i])[j])
      //     }
          
      //   }
      //   // console.log(temp_data)
      //   data.push(temp_data)
      // }
      // data.pop(0)
        // console.log(temp_data)
        // setData(data.push(temp_data))

      setFilteredCustomers(dbCustomers)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function sortCustomers() {
    let newFilteredCustomers = []
    if (search !== ""){
      customers.forEach(element => {
          if (element.customer_id.toString().includes(search) 
          || element.org_name.toUpperCase().includes(search) 
          || element.contact_name.toUpperCase().includes(search)) {
            newFilteredCustomers.push(element);
          }
      });
      if (newFilteredCustomers.length === 0){
        newFilteredCustomers.push({customer_id:"No match found"})
      }
    } else {
      newFilteredCustomers = customers;
    }
    setFilteredCustomers(newFilteredCustomers);
  }

  function handleChange(e){
    setSearch(e.target.value.toString().toUpperCase())
  }
  
  // function get_values() {
  //   let temp_data = [];
  //   for (let i=0; i<customers.length; i++) {
  //     temp_data.push(Object.values(customers[i]))
  //   }
  //     console.log(temp_data)
  //     setData(temp_data)
  // }
  // useEffect(get_values, [])
  useEffect(getCustomers, [])
  

  // const columns = [
  // {
  //   name: "ID",
  //   options: {
  //     sort: true,
  //     SortDirection: "asc"
  //   }
  // },
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
  // "Contact Name", "Country", "City", "Prov", "Postal Code", "Not sure", "Not sure", "Status", "Not sure", "Date"];

  // const data2 = [
  // ["Joe James", 1, "Yonkers", "NY"],
  // ["John Walsh", "Test Corp", "Hartford", "CT"],
  // ["Bob Herm", "Test Corp", "Tampa", "FL"],
  // ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];

  // const options = {
  //   selectableRows: "none",
  //   // expandableRows: true,
  //   // filterType: "dropdown",
  //   // responsive: "scrollMaxHeight",
  //   // expandableRowsHeader: false,
  //   // renderExpandableRow: (rowData, rowMeta) => {
  //   //   return (
  //   //       <div>
  //   //         {JSON.stringify(rowData)}
  //   //         {JSON.stringify(rowMeta)}
  //   //       </div>
  //   //       );
  //   //   }
  // };

  // const customer_table = (
  //   <div className="container">
  //     {/* style={{width:"80%", marginLeft:"auto", marginRight:"auto"}} */}
  //       <div>
  //       <MuiThemeProvider theme={getMuiTheme()}>
  //         <MUIDataTable
  //           title={"Customers"}
  //           data={data}
  //           columns={columns}
  //           options={options}
  //         />
  //         </MuiThemeProvider>
  //     </div>
  //     <input type="button" value="Test" onClick={()=>{console.log(data)}}/>
  //   </div>
  // )

  const customers_list = (
    <div className="container">
      <br></br>
      
      <div className="row justify-content-center">
        <div className="col-9">
          <div className="input-group input-group-md mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
              {/* <input type="button" className="input-group-text" value="Search" /> */}
            </div>
            <input onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
        </div>
        <div className="col-3">
          <LinkContainer to="/new_customer">
            <a className="btn btn-primary  btn-theme">Create a New Customer</a>
          </LinkContainer>
        </div>
      </div>

      <br></br>

      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-sm table-hover table-striped">
            <thead className="thead-green">
              <tr>
                <th className="text-center left_radius">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Organization</th>
                <th className="text-center">Status</th>
                <th className="text-center">More Info</th>
                <th className="text-center right_radius">New Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => 
                <tr>
                  <td className="text-center" id="customer_id">{String(customer.customer_id)}</td>
                  <td className="text-center">{customer.contact_name}</td>
                  <td className="text-center" id="name">{customer.org_name}</td>
                  <td className="text-center" id="email">{customer.cus_status}</td>
                  <td className="text-center"><Link style={{backgroundColor:"lightgrey"}} to={{
                    pathname: `/profile`,
                    query: { customer_id: `${customer.customer_id}` }
                    }} className="btn btn-secondary btn-sm btn-middle">Orders and More Info</Link></td>
                  <td className="text-center" id="submitOrder"><Link to={{
                    pathname: `/create_order/${customer.customer_id}`,
                    query: { customer_id: `${customer.customer_id}` }
                    }} className="btn btn-sm btn-primary btn-theme btn-middle">Submit an Order</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )

  return (
    <>
      {customers_list}
      {/* {customer_table} */}
      
    </>
  );
}


export default Customers;


// function sortCustomers(){
//   var i;
//   if (deactivatedCustomers <= 0){
//   for(i=0; i< customers.length; i++) {
//     if(customers[i].cus_status === "Inactive") {
//       deactivatedCustomers.push(customers[i]);
//       delete customers[i];
//     }
//    }
//   }
// }