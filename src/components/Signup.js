import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "../styles/Signup.css";
import { Auth } from "aws-amplify";


export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <>
      <div className="container-fluid wrapper">
        <div className="container login-card bg-light">
          <div className="row">
            <div className="col">
            <div className="container-fluid formContainer">
              <div className="row">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col"></div>
                        <div className="col-10 formLabel text-center">
                          <h2>Join Our Community!</h2>
                        </div>
                        <div className="col"></div>
                      </div>
                    <Form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col col-4">
                          <p>Employee ID</p>
                        </div>
                        <div className="col col-8">
                          <Form.Group className="form-group" controlId="email" size="lg">
                            <Form.Control
                              autoFocus
                              type="email"
                              value={fields.email}
                              onChange={handleFieldChange}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col col-4">
                          <p>Username</p>
                        </div>
                        <div className="col col-8">
                          <Form.Group className="form-group" controlId="email" size="lg">
                            <Form.Control
                              autoFocus
                              type="email"
                              value={fields.email}
                              onChange={handleFieldChange}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col col-4">
                          <p>Company Email</p>
                        </div>
                        <div className="col col-8">
                          <Form.Group className="form-group" controlId="email" size="lg">
                            <Form.Control
                              autoFocus
                              type="email"
                              value={fields.email}
                              onChange={handleFieldChange}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col col-4">
                          <p>Password</p>
                        </div>
                        <div className="col col-8">
                          <Form.Group controlId="password" size="lg">
                          <Form.Control
                            type="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                          />
                        </Form.Group>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col col-4">
                          <p>Confirm Password</p>
                        </div>
                        <div className="col col-8">
                          <Form.Group controlId="confirmPassword" size="lg">
                            <Form.Control
                              type="password"
                              onChange={handleFieldChange}
                              value={fields.confirmPassword}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col text-center">
                          <LoaderButton
                          className="btn btn-md submitBtn"
                          type="submit"
                          variant="success"
                          isLoading={isLoading}
                        >
                          Signup
                        </LoaderButton>
                        </div>
                        <div className="col col-2"></div>
                        <div className="col text-center">
                        <LoaderButton
                          className="btn btn-md btn-secondary cancelBtn"
                          href="/login"
                        >
                          Cancel
                        </LoaderButton>
                        </div>
                      </div>
                      
                      
                    </Form>
                    </div>
                </div>
                <br></br>
                  <div className="row">
                    <a className="registered" href="/login">Already have an account?</a>
                  </div>
              </div>
          </div>
            <div className="col text-center">
              <img className="login_logo" src="logo.png" alt=""></img>
            </div>
            </div>
          
        </div>
      </div>
      
      </>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}