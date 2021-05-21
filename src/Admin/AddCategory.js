import React from "react";
import "../index.css";
import firebase from "./../Config";
import AdminHeader from "./Header";
import AdminFooter from "./Footer";
import AdminSidebar from "./Sidebar";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      created_on: new Date().toLocaleString(),
      date: "",

      News: [],
    };
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            //return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) && params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var ref = firebase.database().ref("Categories");

      ref.push({
        category: this.state.category,
        created_on: this.state.created_on,
      });

      this.props.history.push("/Admin/CategoryListPage");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminHeader />
            <div className="user-dashboard">
              <AdminSidebar />
              <div className="col-md-10">
                <h4>
                  <strong>Create Category</strong>
                </h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Category Name:</h5>
                    </label>
                    <div className="col-md-9">
                      <input
                        className="text_fillwidth"
                        type="text"
                        name="category"
                        placeholder="Enter Category Name"
                        maxlength="40"
                        value={this.state.category}
                        onChange={this.handleChange}
                      />
                      {this.validator.message(
                        "Category",
                        this.state.category,
                        "required|whitespace|specialChar|min:3|max:70"
                      )}
                    </div>
                  </div>

                  <div class="form-group c_n_block">
                    <label className="col-md-3">
                      <h5></h5>
                    </label>
                    <div className="col-md-9">
                      <button type="submit" class="btn col-md-2 save_btn">
                        Save
                      </button>
                      <Link to="/Admin/CategoryListPage">
                        <button
                          type="button"
                          className="btn col-md-2 cancel_btn"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }
}
export default AddCategory;
