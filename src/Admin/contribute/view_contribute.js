import React from "react";
import "./../../index.css";
import firebase from "./../../Config";
import AdminHeader from "./../Header";
import AdminFooter from "./../Footer";
import AdminSidebar from "./../Sidebar";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import Select from "react-select";

const options = [
  { value: "selected 1", label: "Video" },
  { value: "selected 2", label: "Audio" },
  { value: "selected 3", label: "Picture" },
  { value: "selected 4", label: "Blog" },
];

class ViewContribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneno: "",
      email: "",
      select: "",
      created_on: new Date().toLocaleString(),
      ContributeList: [],
      selectedOption: null,
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

  componentDidMount() {
    const { contributeId } = this.props.match.params;

    var ref = firebase.database().ref(`ContributeList/${contributeId}`);

    ref.on("value", (snapshot) => {
      this.setState({
        avatarURL: snapshot.val().file,
        name: snapshot.val().name,
        phoneno: snapshot.val().phoneno,
        email: snapshot.val().email,
        created_on: snapshot.val().created_on,
        selectedOption: snapshot.val().select,
      });
    });
  }

  handleChange1 = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminHeader />
            <div className="user-dashboard">
              <AdminSidebar />
              <div className="col-md-10">
                <h4>
                  <strong>View Contribute</strong>
                </h4>
                <div className="col-md-12 gap">
                  <div className="row">
                    <div className="col-md-6">Name :</div>
                    <div className="col-md-6">{this.state.name}</div>
                  </div>
                </div>
                <div className="col-md-12 gap">
                  <div className="row">
                    <div className="col-md-6">Email :</div>
                    <div className="col-md-6">{this.state.email}</div>
                  </div>
                </div>
                <div className="col-md-12 gap">
                  <div className="row">
                    <div className="col-md-6">Phone Number :</div>
                    <div className="col-md-6">{this.state.phoneno}</div>
                  </div>
                </div>
                <div className="col-md-12 gap">
                  <div className="row">
                    <div className="col-md-6">Selected Options :</div>
                    <div className="col-md-6">
                      <Select
                        value={selectedOption}
                        isMulti
                        options={options}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group c_n_block">
                  <label className="col-md-3">
                    <h5></h5>
                  </label>
                  <div className="col-md-9">
                    <Link to="/Admin/ContributeList">
                      <button type="button" className="btn col-md-2 cancel_btn">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }
}
export default ViewContribute;
