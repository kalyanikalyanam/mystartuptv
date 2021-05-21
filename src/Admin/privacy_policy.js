import React from "react";
import "../index.css";
import firebase from "./../Config";
import AdminHeader from "./Header";
import AdminFooter from "./Footer";
import AdminSidebar from "./Sidebar";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class AddPrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      theme: "snow",

      created_on: new Date().toLocaleString(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
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
    var sessionId = "1234";

    firebase
      .database()
      .ref("duplicateprivate/" + sessionId)
      .on("value", (snapshot) => {
        var gstData = snapshot.val();
        if (gstData == null) {
        } else {
          console.log(gstData);
          this.setState({
            content: gstData.content,
            created_on: gstData.created_on,
            loading: false,
          });
        }
      });
  }

  handleChange(html) {
    this.setState({ content: html });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  handleSubmit = (event) => {
    var sessionId = "1234";

    event.preventDefault();
    if (this.validator.allValid()) {
      let dbCon = firebase.database().ref(`/duplicateprivate/${sessionId}`);
      console.log(dbCon);
      dbCon.update({
        content: this.state.content,
        created_on: this.state.created_on,
      });
      this.setState({});
      this.props.history.push("/AddPrivacyPolicy");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
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
                  <strong>Privacy Policy</strong>
                </h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Content:</h5>
                    </label>
                    <div className="col-md-9">
                      {/* <input
                        className="text_fillwidth"
                        type="text"
                        name="content"
                        placeholder="Enter Content"
                        maxlength="40"
                        value={this.state.content}
                        onChange={this.handleChange}
                      /> */}
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChange}
                        value={this.state.content}
                        modules={AddPrivacyPolicy.modules}
                        formats={AddPrivacyPolicy.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                      />
                      {this.validator.message(
                        "content",
                        this.state.content,
                        "required"
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
                      <Link to="/Admin/privacypolicy">
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

AddPrivacyPolicy.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

AddPrivacyPolicy.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

AddPrivacyPolicy.propTypes = {
  placeholder: PropTypes.string,
};

export default AddPrivacyPolicy;
