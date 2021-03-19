import React, { Component, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from "axios"
import { access_token, URL } from "../aws-token" 
import "../styles/editCustomer.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
// var cors = require('cors')
// axios.use(cors())

const EditCustomer = (props) => {

    const customer_id = parseInt(props.location.pathname.replace( /^\D+/g, ''));

    const [customer, setCustomer] = useState([]);

    
    const [field, setField] = useState();

    useEffect(getCustomers, [])


    function getCustomers () {
        axios.get(URL + '/customers/' + customer_id, {
            headers: {
            'x-api-key': access_token
            }
        })  
        .then(function (response) {
            setCustomer([response.data.Item])
            setField(response.data.Item.contact_name)
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    }

    function updateCustomer () {
        axios.put(URL + '/customers', 
        {
            "customer_id": 35,
            "contact_name": "Nicole Alca",
            "org_name": "BuiltSpace",
            "org_id": "5",
            "contact_person": {
                "email": "test@email.com",
                "phone": "123"
            },
            "cus_status": "Pending",
            "partner_id": "3",
            "partner_contact": {
                "email": "hehe@email.com",
                "phone": "123",
                "par_name": "hehe"
            },
            "sales_contact": {
                "email": "hehe@email.com",
                "sales_name": "hehe",
                "phone": "123"
            },
            "ship_address": {
                "Address": "222 East",
                "City": "City",
                "country": "Country",
                "post_code": "123 123",
                "prov": "CD"
            }
          }, {
            headers: {
                'x-api-key': access_token
            },
        })  
        .then(function (response) {
            console.log("test", response);
            // window.location.reload();
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    }

    function deleteCustomer () {
        axios.delete(URL + '/customers/' + customer_id, {
            headers: {
            'x-api-key': access_token
            }
        })  
        .then(function (response) {
            console.log("test", response);
            // window.location.reload();
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    }
        
    const customers_list = customer.map((cus, index) => 
    <div key={index} style={{width:"1000px", marginLeft:"auto", marginRight:"auto", backgroundColor:"whitesmoke"}}>

        <div style={{padding:"20px"}}>
            <h5>Contact Information</h5>
            <div style={{marginTop:"25px"}}>
                <TextField style={{width:"240px"}} label="Contact Name" defaultValue={cus.contact_name} variant="outlined" onChange={(e) => {customer[0].contact_name = e.target.value}} />
                <TextField style={{marginLeft:"15px", width:"240px"}} label="Email" defaultValue={cus.contact_person.email} variant="outlined" onChange={(e) => {customer[0].contact_person.email = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="Phone" defaultValue={cus.contact_person.phone} variant="outlined" onChange={(e) => {customer[0].contact_person.phone = e.target.value}} /> 
                {/* <TextField style={{marginLeft:"15px"}} label="Status" defaultValue={cus.cus_status} variant="outlined" onChange={(e) => {customer[0].cus_status = e.target.value}} /> */}
                <TextField style={{marginLeft:"15px", width:"200px"}} label="Status" onChange={(e) => {customer[0].cus_status = e.target.value}} value={customer.cus_status} defaultValue="test" select variant="outlined" SelectProps={{native: true,}}>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Declined</option>
                </TextField> 
            </div>
        </div>

        <div style={{padding:"20px"}}>
            <h5>Shipping Information</h5>
            <div style={{marginTop:"25px"}}>
                <TextField style={{width:"300px"}} label="Address" defaultValue={cus.ship_address.Address} variant="outlined" onChange={(e) => {customer[0].ship_address.Address = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="City" defaultValue={cus.ship_address.City} variant="outlined" onChange={(e) => {customer[0].ship_address.City = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="Country" defaultValue={cus.ship_address.country} variant="outlined" onChange={(e) => {customer[0].ship_address.country = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Postal Code" defaultValue={cus.ship_address.post_code} variant="outlined" onChange={(e) => {customer[0].ship_address.post_code = e.target.value}} />
                <TextField style={{marginTop:"15px", marginLeft:"15px"}} label="Province" defaultValue={cus.ship_address.prov} variant="outlined" onChange={(e) => {customer[0].ship_address.prov = e.target.value}} />
            </div>
        </div>

        <div style={{padding:"20px"}}>
            <h5>Partner Information</h5>
            <div style={{marginTop:"25px"}}>
                <TextField style={{width:"200px"}} label="Org ID" defaultValue={cus.org_id} variant="outlined" onChange={(e) => {customer.org_id = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="Organization Name" defaultValue={cus.org_name} variant="outlined" onChange={(e) => {customer.org_name = e.target.value}} />
                <TextField style={{width:"200px", marginLeft:"15px", marginRight:"50px"}} label="Partner ID" defaultValue={cus.partner_id} variant="outlined" onChange={(e) => {customer[0].partner_id = e.target.value}} />
                <TextField style={{width:"300px", marginTop:"15px"}} label="Partner Name" defaultValue={cus.partner_contact.par_name} variant="outlined" onChange={(e) => {customer[0].partner_contact.par_name = e.target.value}} />
                <TextField style={{marginLeft:"15px", width:"300px", marginTop:"15px"}} label="Partner Email" defaultValue={cus.partner_contact.email} variant="outlined" onChange={(e) => {customer[0].partner_contact.email = e.target.value}} />
                <TextField style={{marginLeft:"15px", width:"300px", marginTop:"15px"}} label="Partner Phone" defaultValue={cus.partner_contact.phone} variant="outlined" onChange={(e) => {customer[0].partner_contact.phone = e.target.value}} />
            </div>
        </div>


        <div style={{padding:"20px"}}>
            <h5>Sales Contact</h5>
            <div style={{marginTop:"25px"}}>
                <TextField style={{width:"300px"}} label="Sales Name" defaultValue={cus.sales_contact.sales_name} variant="outlined" onChange={(e) => {customer[0].sales_contact.sales_name = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="Sales Email" defaultValue={cus.sales_contact.email} variant="outlined" onChange={(e) => {customer[0].sales_contact.email = e.target.value}} />
                <TextField style={{marginLeft:"15px"}} label="Sales Phone" defaultValue={cus.sales_contact.phone} variant="outlined" onChange={(e) => {customer[0].sales_contact.phone = e.target.value}} />
            </div>
        </div>

        <div>
            <div style={{textAlign:"center", paddingBottom:"200px", backgroundColor:"white", paddingTop:"20px"}}>
                <Button style={{width:"150px"}} onClick={updateCustomer} className="btn btn-success">Save Changes</Button>
                <a href="/customers"><Button style={{width:"150px", marginLeft:'50px'}} onClick={deleteCustomer} className="btn btn-danger">Delete</Button></a>
                <Button style={{marginLeft:'50px', width:"150px"}} className="btn btn-md btn-secondary">Cancel</Button>
            </div>
        </div>

        
        
    </div>
    );
      

    return (
        <>
        {customers_list}
        {/* <input type="button" value="Test" onClick={()=>{console.log(customer)}} /> */}
        
        </>
        
    );
}

export default EditCustomer;