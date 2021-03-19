import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import awsconfig from '../aws-exports';
import "../styles/form.css";

// TODO: Store multiple values in one state instead of having state for each field
// This form currently accepts input for Organization, Customer Name and Status and passes the rest of the data fields as blank/null




function Form(props) {

  const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

  const [ContactName, setContactName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState("Active");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [ContactEmail, setContactEmail] = useState("");
  const [ContactPhone, setContactPhone] = useState("");
  const [pref_des, setPrefDes] = useState("");
  const [org_id, setOrgId] = useState("");
  const [serial_prefix, setSerialPrefix] = useState("");
  const [sales_cont_name, setSalesContName] = useState("");
  const [sales_cont_email, setSalesContEmail] = useState("");
  const [sales_cont_phone, setSalesContPhone] = useState("");
  const [partner_id, setPartnerId] = useState("");
  const [partner_name, setPartnerName] = useState("");
  const [partner_email, setPartnerEmail] = useState("");
  const [partner_phone, setPartnerPhone] = useState("");
  


  function musicianRegisterModal() {
    // Get the modal
    document.getElementById("registerModal").style.display = "block";
  }
  
  function closeModal() {
    window.location.replace(process.env.PUBLIC_URL + '/customers')
  }
  
  window.onclick = function(event) {
    let modal = document.getElementById("registerModal")
    if (event.target == modal) {
      window.location.replace(process.env.PUBLIC_URL + '/customers');
    }
  }

    
    function handleSubmit(e) {
        e.preventDefault();
      axios.post(URL + '/customers', {
        "org_name": orgName,
        "cus_status": status,
        "contact_name": ContactName, 
        "ship_address": {
          "Address": address,
          "City": city,
          "prov": province,
          "post_code": postalCode,
          "country": country
        },
        "pref_des": pref_des,
        "org_id": org_id,
        "serial_prefix": serial_prefix,
        "contact_person": {
          "email": ContactEmail,
          "phone": ContactPhone
        },
        "sales_contact": {
          "sales_name": sales_cont_name,
          "email": sales_cont_email,
          "phone": sales_cont_phone
        },
        "partner_id": partner_id,
        "partner_contact": {
          "par_name": partner_name,
          "email": partner_email,
          "phone": partner_phone
        }
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
      setContactName("");
      setOrgName("");
      setStatus(status);
      setAddress("");
      setCity("");
      setCountry("");
      setProvince("");
      setPostalCode("");
      setContactName("");
      setContactEmail("");
      setContactPhone(""); 
      setPrefDes("");
      setOrgId("");
      setSerialPrefix("");
      setSalesContName("");
      setSalesContEmail("");
      setSalesContPhone("");
      setPartnerId("");
      setPartnerName("");
      setPartnerEmail("");
      setPartnerPhone("");
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="row">
        <div className="col"></div>
        <div className="col-8">
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col-8 text-center"><p className="h2 formLabel">Create a Customer</p></div>
            <div className="col"></div>
          </div>
          <br></br>
          <br></br>
          <div className="row">

            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Organization Name</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Organization ID</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={org_id}
                  onChange={e => setOrgId(e.target.value)}></input>
                </div>
              </div>
            </div>

            
          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Address</p></div>
                <div className="col-7"><input className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
                  ></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">City</p></div>
                <div className="col-7"><input className="form-control"
                value={city}
                onChange={e => setCity(e.target.value)}></input></div>
              </div>
            </div>

          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">State/Province</p></div>
                <div className="col-7"><input className="form-control"
                value={province}
                onChange={e => setProvince(e.target.value)}></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Country</p></div>
                <div className="col-7"><input className="form-control"
                value={country}
                onChange={e => setCountry(e.target.value)}></input></div>
              </div>
            </div>
          </div>

          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Status</p>
                </div>
                <div className="col-7">
                  <select className="form-control inputField" 
                    onChange={e => setStatus(e.target.value)} defaultValue="Customer Status">
                    <option value="Active">Active</option>
                    <option value="On-Boarding">On-Boarding</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Serial Prefix</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={serial_prefix}
                  onChange={e => setSerialPrefix(e.target.value)}></input>
                </div>
              </div>
            </div>
            </div>


          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Contact Name</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactName}
                onChange={e => setContactName(e.target.value)}></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Postal Code</p></div>
                <div className="col-7"><input className="form-control"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                ></input></div>
              </div>
            </div>


          </div>
          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Contact Email</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactEmail}
                onChange={e => setContactEmail(e.target.value)}
                ></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title"> Contact Phone</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactPhone}
                onChange={e => setContactPhone(e.target.value)}></input></div>
              </div>
            </div>
          </div>

          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Prefered Template</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={pref_des}
                  onChange={e => setPrefDes(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Sales Person Name</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={sales_cont_name}
                  onChange={e => setSalesContName(e.target.value)}></input>
                </div>
              </div>
            </div>
            </div>

            <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Sales Person Email</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={sales_cont_email}
                  onChange={e => setSalesContEmail(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Sales Person Phone</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={sales_cont_phone}
                  onChange={e => setSalesContPhone(e.target.value)}></input>
                </div>
              </div>
            </div>
            </div>

            <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Partner ID</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={partner_id}
                  onChange={e => setPartnerId(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Partner Name</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={partner_name}
                  onChange={e => setPartnerName(e.target.value)}></input>
                </div>
              </div>
            </div>
            </div>

            <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Partner Email</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={partner_email}
                  onChange={e => setPartnerEmail(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Partner Phone</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={partner_phone}
                  onChange={e => setPartnerPhone(e.target.value)}></input>
                </div>
              </div>
            </div>
            </div>

          <br></br>
          <br></br>
          <div className="row">
          <div className="col text-center">
          <Button className="btn btn-success" type="submit" onClick={(e) => {musicianRegisterModal() }} >
           Create Customer
          </Button>
        </div>
        {/* onClick={redirect} */}
            
            
            <div className="col-5">
              <a className="btn btn-md btn-secondary btn-secondary-form" href="/Customers">Cancel</a>
            </div>

            <div id="registerModal" class="registerModal">
        <div class="registerModal-content">
          <span class="close" onClick={closeModal}>&times;</span>
          <p class="registerModalText">Account succesfully registered.</p>
        </div>
      </div>

          </div>
        </div>
        </div>
        <div className="col"></div>
        </div>
    </form>
    
    </>
  );
}

export default Form;
