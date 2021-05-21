import React from "react";
import { Form } from 'reactstrap';

import firebase from '../Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import SimpleReactValidator from "simple-react-validator";



class ChangeEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            email: "", 
            confirm_email: "",
            old_email: "",
            old_pass: "",
            employer_sevice_message: "",

            showLoading: false
        };
        this.validator = new SimpleReactValidator({
            className: "text-danger",
            validators: {
                emailvalid: {
                    message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                            "ter and 1 alphabet.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
                    }
                },
                emailMismatch: {
                    message: "confirm email must match with email field.",
                    rule: function (val, params, validator) {
                        return document
                            .getElementById("email_input")
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
    componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("userId");
    
          
        
      }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            if (this.state.confirm_email !== this.state.email) {
               
                this.setState({employer_sevice_message: " email and Confirm email don't match" });
            } else {
                let user = firebase.auth().currentUser;
                user.updateEmail(this.state.email)
                .then((result) => {
                    this.setState({employer_sevice_message: "Succesfully Password Changed"
                });
                })

              
                
            }
           

            
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
    //     <div>
    //    <SidebarPage/>
     
    //   <div className="all-content-wrapper">
    //   <HeaderPage/>
     
            
    //           <div className="breadcome-area">
    //               <div className="container-fluid">
    //                   <div className="row">
    //                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    //                           <div className="breadcome-list">
    //                               <div className="row">
    //                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
    //                                       <div className="breadcomb-wp">
                                          
    //                                           <div className="breadcomb-ctn">
    //                                           <h2>Change email </h2>
    //                                               </div>
    //                                       </div>
    //                                   </div>
                            
    //                               </div>
    //                           </div>
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
        
       
    //           <div className="single-product-tab-area mg-b-30">
          
    //       <div className="single-pro-review-area">
    //           <div className="container-fluid">
    //               <div className="row">
    //                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    //                       <div className="review-tab-pro-inner">
                 
    //              <h4>Changeemail</h4>
                 
                 
                          
    //                       <div className="product-tab-list tab-pane fade active in">
    //                       <Form onSubmit={this.handleSubmit} id="login-form" className="widget-form">

   
                          
    //                       <div className="row m-b-20">
    //                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                       
    //                       <input
    //                                                 type="email"
    //                                                 name="old_email"
    //                                                 value={this.state.old_email}
    //                                                 onChange={this.onChange}
    //                                                 className="form-control  mb-20"
    //                                                 placeholder="Old email"/> {this
    //                                                 .validator
    //                                                 .message("Old email", this.state.old_email, "required|email")}
    //                                                 <div className="text-danger">
    //                                                 {" "}
    //                                                 {this.state.employer_sevice_message}
    //                                             </div>
                         
                        
    //                       </div>
    //                       </div>
    //                       <div className="row m-b-20">
    //                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                       
    //                       <input
    //                                                 type="email"
    //                                                 name="email"
    //                                                 value={this.state.email}
    //                                                 onChange={this.onChange}
    //                                                 className="form-control  mb-20"
    //                                                 placeholder="New email"
    //                                                 id="email_input"/> {this
    //                                                 .validator
    //                                                 .message("New email", this.state.email, "required|email")}
                      
                     
    //                    </div>

    //                       </div>

    //                       <div className="row m-b-20">
    //                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                       
    //                       <input
    //                                                 type="email"
    //                                                 name="confirm_email"
    //                                                 className="form-control mb-20"
    //                                                 placeholder="Re-Enter email"
    //                                                 onChange={this.onChange}
    //                                                 value={this.state.confirm_email}/> {this
    //                                                 .validator
    //                                                 .message("Re-Enter email", this.state.confirm_email, "required|emailMismatch")}

                      
                     
    //                    </div>

    //                       </div>

    //                                   <div className="row">
    //                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    //                                           <div className="text-left custom-pro-edt-ds">
    //                                           <button
    //                                                         type="submit" value=" Change email"
    //                                                         className="btn hami-btn  pull-left"
    //                                                         style={{
    //                                                         position: "initial",
    //                                                         width: "100%"
    //                                                     }}>
    //                                                         Change email
    //                                                     </button>
                                               
    //                                           </div>
    //                                       </div>
    //                                   </div>
    //                                   </Form>
    //                               </div>
                               

          
                              
                      
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    //       </div>
    //        <FooterPage/>
      
    //     </div>

    <div>          
              
    <div className="container-fluid">
    <div className="row">
        <AdminHeader/>
           <div className="user-dashboard">
                <AdminSidebar/> 
                <div className="col-md-10">                 
                <h4><strong>Change Email</strong></h4>
                <div className="text-danger">
                                                    {" "}
                                                    {this.state.employer_sevice_message}
                                                </div>
                <Form onSubmit={this.handleSubmit} id="login-form" className="widget-form">

<div className="row">
<div className="form-group col-md-12">
<label>Old Email
  <span className="required">*</span>
</label>
<input
 
  className="form-control  mb-20"
  type="email"
                                                  name="old_email"
                                                  value={this.state.old_email}
                                                  onChange={this.onChange}
                                                  className="form-control  mb-20"
                                                  placeholder="Old email"/> 
                                                 {this
                                                    .validator
                                                    .message("Old email", this.state.old_email, "required|email")}
                                                    <div className="text-danger">
                                                    {" "}
                                                    {this.state.employer_sevice_message}
                                                </div>
</div>
<div className="form-group col-md-12">
<label>New Email
  <span className="required">*</span>
</label>
<input
  type="email"
                                                  name="email"
                                                  value={this.state.email}
                                                  onChange={this.onChange}
                                                  className="form-control  mb-20"
                                                  placeholder="New email"
                                                  id="email_input"/> {this
                                                                                                    .validator
                                                                                                    .message("New email", this.state.email, "required|email")}
</div>
<div className="form-group col-md-12">
<label>Confirm Email
  <span className="required">*</span>
</label>
<input
  type="email"
                                                  name="confirm_email"
                                                  className="form-control mb-20"
                                                  placeholder="Re-Enter email"
                                                  onChange={this.onChange}
                                                  value={this.state.confirm_email}/> {this
                                                                                                    .validator
                                                                                                    .message("Re-Enter email", this.state.confirm_email, "required|emailMismatch")}

</div>

<div className="col-md-12 no-padd mt-20">
<span className="pull-left">

  <button
     type="submit" value=" Change email"
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
export default ChangeEmail;
