import React from 'react';
import firebase from '../Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import {Form} from 'reactstrap';

import SimpleReactValidator from "simple-react-validator";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            password: "",
            confirm_password: "",
            old_password: "",
            old_pass: "",
            employer_sevice_message: "",
            authenticated: false,
            showLoading: false
        };
        this.validator = new SimpleReactValidator({
            className: "text-danger",
            validators: {
                passwordvalid: {
                    message: "The :attribute must be at least 6 and at most 30 characters with 1 numeric,1 spe" +
                            "cial character and 1 alphabet.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
                    }
                },
                passwordMismatch: {
                    message: "Confirm Password must match with New password.",
                    rule: function (val, params, validator) {
                        return document
                            .getElementById("password_input")
                            .value === val
                            ? true
                            : false;
                    }
                },

                whitespace: {
                    message: "The :attribute not allowed first whitespace   characters.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
                    }
                },
                specialChar: {
                    message: "The :attribute not allowed special   characters.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
                    }
                },
                specialCharText: {
                    message: "The :attribute may only contain letters, dot and spaces.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
                    }
                }
            }
        });

    }
    reauthenticate = (currentPassword) => {
        var user = firebase
            .auth()
            .currentUser;
        var cred = firebase
            .auth
            .EmailAuthProvider
            .credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    handleSubmit = (event) => {
        event.preventDefault();

        var sessionId = sessionStorage.getItem("userId");
        if (this.validator.allValid()) {
            this
                .reauthenticate(this.state.old_password)
                .then(() => {

                    var users = firebase
                        .auth()
                        .currentUser;

                    users
                        .updatePassword(this.state.password)
                        .then((result) => {
                            this.setState({
                                password: "",
                                confirm_password: "",
                                old_password: "",
                                employer_sevice_message: "Succesfully Password Changed"
                        
                        });
                        })
                        .catch(error => {
                            this.setState({error});
                            this.setState({employer_sevice_message: this.state.error.message});
                        });

                })
                .catch((error) => {
                    console.log(error);
                    this.setState({employer_sevice_message: "The  old password is invalid or the user does not have a password"});
                });
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {

        return (
           
              <div>          
              
              <div className="container-fluid">
              <div className="row">
                  <AdminHeader/>
                     <div className="user-dashboard">
                          <AdminSidebar/> 
                          <div className="col-md-10">                 
                          <h4><strong>Change Password</strong></h4>
                          <div className="text-danger">
                                                    {" "}
                                                    {this.state.employer_sevice_message}
                                                </div>
                          <Form onSubmit={this.handleSubmit} id="login-form" className="widget-form">

<div className="row">
    <div className="form-group col-md-12">
        <label>Old Password
            <span className="required">*</span>
        </label>
        <input
            type="text"
            name="old_password"
            value={this.state.old_password}
            onChange={this.onChange}
            className="form-control  mb-20"
            placeholder="Old Password"/> {this
            .validator
            .message("Old Password", this.state.old_password, "required|passwordvalid|min:6|max:30")}
    </div>
    <div className="form-group col-md-12">
        <label>New Password
            <span className="required">*</span>
        </label>
        <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            className="form-control  mb-20"
            placeholder="New Password"
            id="password_input"/> {this
            .validator
            .message("New Password", this.state.password, "required|passwordvalid|min:6|max:30")}
    </div>
    <div className="form-group col-md-12">
        <label>Confirm Password
            <span className="required">*</span>
        </label>
        <input
            type="text"
            name="confirm_password"
            className="form-control mb-20"
            placeholder="Confirm Password"
            onChange={this.onChange}
            value={this.state.confirm_password}/> {this
            .validator
            .message("Confirm Password", this.state.confirm_password, "required|passwordMismatch")}

    </div>

    <div className="col-md-12 no-padd mt-20">
        <span className="pull-left">

            <button
                type="submit"
                value=" Change Password"
                className="btn register-button mt-0 sub_low"
                style={{
                position: "initial",
                width: "100%"
            }}>
                Update
            </button>
        </span>
    </div>
</div>

</Form>
                       </div>
                       </div>
              </div>
          </div>
          <AdminFooter/>
          </div>
        );
    }
}

export default ChangePassword;
