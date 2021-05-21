import React, { Component } from "react";

import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl} from "react-bootstrap";
import "./index.css";
import firebase from './Config';
import SimpleReactValidator from "simple-react-validator";

 class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error:null,
      created_on: new Date().toLocaleString(),
      employer_sevice_message: "",
      showLoading: false,
      Login:[],
    };
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
          passwordvalid: {
              message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                      "ter and 1 alphabet.",
              rule: function (val, params, validator) {
                  // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                  // params.indexOf(val) === -1
                  return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
              }
          },
          passwordMismatch: {
              message: "confirm password must match with password field.",
              rule: function (val, params, validator) {
                  return document
                      .getElementById("password_input")
                      .value === val
                      ? true
                      : false;
              }
          }
      }
  });
  }

  
  

  handleSubmit=(event)=>{
    event.preventDefault();

    if (this.validator.allValid()) {

        const {email, password} = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);

                var user = result.user;
                console.log(user.uid);

                
                        sessionStorage.setItem("RoleId", user.uid);
                        sessionStorage.setItem("email", user.email);
                       
                        this
                        .props
                        .history
                        .push("/Admin/Dashboard");


            

                

            })
            .catch(error => {
                this.setState({error});
                console.log(this.state.error);
                this.setState({employer_sevice_message: this.state.error.message});
            });
    } else {
        this
            .validator
            .showMessages();
        this.forceUpdate();
    }
    
    
    };

   
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };



render() {
  
        return (
      <div className="Login">
        <div className="col-md-12 center_logo">
                 <Link to="/"><img src="/img/logo.png" alt="logo" className="hidden-xs hidden-sm" style={{height:"70px"}} />
                  </Link>
            </div>
        <span style={{"text-align":"center","padding":"50px"}}><h4><b>Login Page</b></h4></span>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <label>Email</label>
            <FormControl className="no_radius"
              autoFocus
              type="email"
              name="email"
             
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <label>Password</label>
            <FormControl className="no_radius"
            name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button type="submit" className="btn login_btn form-control">Login</Button>
        </form>
      </div>
    );
  }
}

export default Login;