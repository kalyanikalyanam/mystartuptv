import React from "react";
import "./../../index.css";
import firebase from "./../../Config";
import AdminHeader from "./../Header";
import AdminFooter from "./../Footer";
import AdminSidebar from "./../Sidebar";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class AddBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      subheading: "",
      authorname: "",

      url: "",
      category: "",
      content: "",
      description1: "",
      description2: "",
      image: "",
      image1: "",
      created_on: new Date().toLocaleString(),
      created_on1: Date.now(),
      date: "",
      schedule_date: "",
      status: "select",
      Blog: [],
      avatar: "",
      progress: 0,
      theme: "snow",
      isUploading: false,
      avatar1: "",
      isUploading1: false,
      progress1: 0,
      uploadImage: "",
      count: 0,
      hashtag: "",
    };
    this.handleChangeHtml = this.handleChangeHtml.bind(this);
    this.handleChangeHtml1 = this.handleChangeHtml1.bind(this);
    this.handleChangeHtml2 = this.handleChangeHtml2.bind(this);
    this.handleChangeHtml3 = this.handleChangeHtml3.bind(this);

    this.handleChangeHtml4 = this.handleChangeHtml4.bind(this);
    this.handleChangeHtml5 = this.handleChangeHtml5.bind(this);
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
    this.setState({ loading: true });
    var ref = firebase.database().ref("Categories/");

    ref.on("value", (snapshot) => {
      const data = [];

      snapshot.forEach((childSnapShot) => {
        const Categories = {
          categoryId: childSnapShot.key.toString(),
          category: childSnapShot.val().category,
          created_on: childSnapShot.val().created_on,
        };

        data.push(Categories);
      });

      this.setState({ Categories: data, loading: false });
      console.log(this.state.Categories);
    });
  }

  handleChangeHtml(html) {
    this.setState({ content: html });
  }
  handleChangeHtml1(html) {
    this.setState({ headline: html });
  }
  handleChangeHtml2(html) {
    this.setState({ subheading: html });
  }
  handleChangeHtml3(html) {
    this.setState({ authorname: html });
  }
  handleChangeHtml4(html) {
    this.setState({ description1: html });
  }
  handleChangeHtml5(html) {
    this.setState({ description2: html });
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
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    console.log(this.state.avatar);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ image: url }));
  };

  handleUploadStart1 = () =>
    this.setState({ isUploading1: true, progress1: 0 });
  handleProgress1 = (progress1) => this.setState({ progress1 });
  handleUploadError1 = (error) => {
    this.setState({ isUploading1: false });
    console.error(error);
  };
  handleUploadSuccess1 = (filename) => {
    this.setState({ avatar1: filename, progress1: 100, isUploading1: false });
    console.log(this.state.avatar1);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ image1: url }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      let data1;
      if (this.state.date == "" || this.state.date == null) {
        data1 = this.state.created_on;
      } else {
        data1 = this.state.date;
      }
      let d1;
      if (this.state.schedule_date == "" || this.state.schedule_date == null) {
        d1 = this.state.created_on;
      } else {
        d1 = this.state.schedule_date;
      }

      // const d1 = this.state.schedule_date;

      const result = Date.parse(d1);
      var ref = firebase.database().ref("Blog");

      ref
        .push({
          headline: this.state.headline,
          subheading: this.state.subheading,
          authorname: this.state.authorname,
          content: this.state.content,
          url: this.state.url,
          category: this.state.category,
          description1: this.state.description1,
          description2: this.state.description2,
          image: this.state.image,
          image1: this.state.image1,
          created_on: this.state.created_on,
          status: this.state.status,
          hashtag: this.state.hashtag,
          date: data1,
          schedule_date: this.state.schedule_date,
          schedule_date_number: result,

          count: 0,
        })
        .then((res) => {
          this.setState({
            headline: "",
            subheading: "",
            content: "",
            url: "",
            category: "",
            date: "",
            image: "",
          });
          this.props.history.push("/Admin/BlogList");
        });
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
    const divStyle = {
      height: "300px",
      marginBottom: "40px",
    };
    const divStyle1 = {
      height: "100px",
      marginTop: "20px",
      marginBottom: "20px",
    };
    const divStyle2 = {
      height: "100px",
      marginTop: "20px",
      marginBottom: "40px",
    };
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminHeader />
            <div className="user-dashboard">
              <AdminSidebar />
              <div className="col-md-10">
                <h4>
                  <strong>Create Blog</strong>
                </h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        HeadLine
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                        :
                      </h5>
                    </label>
                    <div className="col-md-9">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml1}
                        value={this.state.headline}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle1}
                      />
                      {this.validator.message(
                        "HeadLine",
                        this.state.headline,
                        "required|whitespace|min:3"
                      )}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Sub Heading:</h5>
                    </label>
                    <div className="col-md-9">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml2}
                        value={this.state.subheading}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle1}
                      />
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Author name:</h5>
                    </label>
                    <div className="col-md-9">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml3}
                        value={this.state.authorname}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle2}
                      />
                    </div>
                  </div>

                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        URL{" "}
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                        :
                      </h5>
                    </label>
                    <div className="col-md-9">
                      <input
                        className="text_fillwidth"
                        type="url"
                        name="url"
                        placeholder="Enter URL"
                        value={this.state.url}
                        onChange={this.handleChange}
                      />
                      {this.validator.message(
                        "URL",
                        this.state.url,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        uploadImage 1{" "}
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                      </h5>
                    </label>
                    <div className="col-md-9">
                      {this.state.isUploading && (
                        <p>Progress: {this.state.progress}</p>
                      )}
                      {this.state.image && (
                        <img
                          src={this.state.image}
                          style={{
                            height: "200px",
                            width: "250px",
                          }}
                        />
                      )}
                      <FileUploader
                        accept="image/*"
                        className="text_fillwidth"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                      />{" "}
                      {this.validator.message(
                        "Image",
                        this.state.image,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>uploadImage 2</h5>
                    </label>
                    <div className="col-md-9">
                      {this.state.isUploading && (
                        <p>Progress: {this.state.progress}</p>
                      )}
                      {this.state.image1 && (
                        <img
                          src={this.state.image1}
                          style={{
                            height: "200px",
                            width: "250px",
                          }}
                        />
                      )}
                      <FileUploader
                        accept="image/*"
                        className="text_fillwidth"
                        name="avatar1"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart1}
                        onUploadError={this.handleUploadError1}
                        onUploadSuccess={this.handleUploadSuccess1}
                        onProgress={this.handleProgress1}
                      />{" "}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Date:</h5>
                    </label>
                    <div className="col-md-9">
                      <input
                        className="text_fillwidth"
                        type="datetime-local"
                        name="date"
                        style={{ width: "100%" }}
                        placeholder=""
                        value={this.state.date}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        Schedule Date{" "}
                        {/* <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>{" "} */}
                        :
                      </h5>
                    </label>
                    <div className="col-md-9">
                      <input
                        className="text_fillwidth"
                        type="datetime-local"
                        name="schedule_date"
                        style={{ width: "100%" }}
                        placeholder=""
                        value={this.state.schedule_date}
                        onChange={this.handleChange}
                      />
                      {/* {this.validator.message(
                        "schedule date",
                        this.state.schedule_date,
                        "required"
                      )} */}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        Enter Description{" "}
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                      </h5>
                    </label>
                    <div className="col-md-9 ">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml}
                        value={this.state.content}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle}
                      />
                      {this.validator.message(
                        "Content",
                        this.state.content,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Enter Limited Description </h5>
                    </label>
                    <div className="col-md-9 ">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml4}
                        value={this.state.description1}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle}
                      />
                      {this.validator.message(
                        "Description",
                        this.state.description1,
                        "min:1000|max:1100"
                      )}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>Enter Description</h5>
                    </label>
                    <div className="col-md-9 ">
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChangeHtml5}
                        value={this.state.description2}
                        modules={AddBlog.modules}
                        formats={AddBlog.formats}
                        bounds={".app"}
                        placeholder={this.props.placeholder}
                        className="add-new-post__editor mb-1"
                        style={divStyle}
                      />
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        Select Category{" "}
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                        :
                      </h5>
                    </label>
                    <div className="col-md-9 ">
                      <select
                        className="text_fillwidth"
                        id="lang"
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category}
                      >
                        <option>Select Category</option>
                        {this.state.Categories &&
                          this.state.Categories.map((data, index) => {
                            return (
                              <option value={data.category} key={index}>
                                {data.category}
                              </option>
                            );
                          })}
                      </select>

                      {this.validator.message(
                        "category",
                        this.state.category,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="form-group c_n_block">
                    <label className="col-md-3">
                      <h5>
                        HashTag{" "}
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          *
                        </span>
                        :
                      </h5>
                    </label>
                    <div className="col-md-9 ">
                      <textarea
                        className="text_fillwidth"
                        type="text"
                        name="hashtag"
                        placeholder="Enter HashTag"
                        style={{ width: "100%" }}
                        className="longInput"
                        value={this.state.hashtag}
                        onChange={this.handleChange}
                      ></textarea>{" "}
                      {this.validator.message(
                        "Hashtag",
                        this.state.hashtag,
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
                      <Link to="/Admin/BlogList">
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

AddBlog.modules = {
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

AddBlog.formats = [
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

AddBlog.propTypes = {
  placeholder: PropTypes.string,
};

export default AddBlog;
