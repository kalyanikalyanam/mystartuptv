import React from "react";
import "./../index.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import firebase from "./../Config";
import Header from "./../Header";
import Footer from "./../Footer";
import Button from "./../Button";
import renderHTML from "react-render-html";
import SimpleReactValidator from "simple-react-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import * as moment from "moment";
const styles1 = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20,
  },
  form: {
    display: "flex",
  },
  input: {
    color: "inherit",
    background: "none",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16,
  },
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer",
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px",
  },
};

class BlogSpecific extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      subheading: "",
      authorname: "",
      content: "",
      url: "",
      image: "",
      image1: "",
      description1: "",
      description2: "",

      category: "",
      date: "",
      Blog: [],
      autoplay: false,
      duration: "",
      count: 0,
      theme: "snow",
      status: "Unread",
      buttonclicked: false,
      created_on: new Date().toLocaleString(),
      message: "",
      name: "",
      text: "",
      Comments: [],
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
    const { blogId } = this.props.match.params;

    console.log(blogId);
    let dataCount = 0;
    var ref = firebase.database().ref(`Blog/${blogId}`);
    ref.on("value", (snapshot) => {
      var data = snapshot.val();
      dataCount = snapshot.val().count;
      console.log(dataCount);
      this.setState({
        headline: data.headline,
        content: data.content,
        subheading: data.subheading,
        authorname: data.authorname,
        url: data.url,
        image: data.image,
        image1: data.image1,
        description1: data.description1,
        description2: data.description2,
        created_on: data.created_on,
        date: data.date,
        count: data && data.count,
      });
      console.log(this.state.count);
    });
    setTimeout(() => this.countUpdate(this.state.count), 5000);
  }
  countUpdate = (count) => {
    console.log(count);
    const { blogId } = this.props.match.params;
    var ref = firebase.database().ref(`Blog/${blogId}`);

    ref.update({
      count: count + 1,
    });
  };

  handleDuration = (duration) => {
    var d = Number(duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var duration = hDisplay + mDisplay + sDisplay;
    console.log(hDisplay + mDisplay + sDisplay);
    // return hDisplay + mDisplay + sDisplay;

    // console.log('onDuration', duration)
    this.setState({ duration });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var ref = firebase.database().ref("comments");

      ref
        .push({
          name: this.state.name,
          message: this.state.message,
          created_on: this.state.created_on,
          text: this.state.text,
        })
        .then((res) => {
          this.setState({
            name: "",

            message: "",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    this.setState({
      text: this.state.text + emoji,
      buttonclicked: false,
    });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({
      buttonclicked: true,
    });
  };
  render() {
    // const dataLen = this.state.Blog.length;
    // let { leftIcon, rightIcon } = this.state;

    return (
      <div>
        <Header />

        <div className="container">
          <section className="col-md-12">
            <div className="content_justify">
              <h2>
                <strong> {renderHTML(this.state.headline)}</strong>
              </h2>
            </div>
            {this.state.subheading == "" ? null : (
              <div className="content_justify">
                <h2>
                  <strong style={{ color: "#8c8686", fontSize: "20px" }}>
                    {renderHTML(this.state.subheading)}
                  </strong>
                </h2>
              </div>
            )}
            {this.state.image == "" ? null : (
              <div className="blog-image">
                <img width="100%" src={this.state.image}></img>
              </div>
            )}
            <div className="content_justify blog-image">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    {" "}
                    {this.state.authorname == "" ? null : (
                      <h3>{renderHTML(this.state.authorname)}</h3>
                    )}
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                      {" "}
                      <h3>
                        {" "}
                        {moment(this.state.date)
                          .locale("en")
                          .format("DD-MM-YYYY")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content_justify">
              {renderHTML(this.state.content)}
            </div>
            {this.state.image1 && this.state.description1 ? (
              <div className="content_justify blog-image">
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      {" "}
                      <img width="100%" src={this.state.image1}></img>
                    </div>
                    <div className="col-md-6">
                      <div className="content_justify">
                        {renderHTML(this.state.description1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.image1 == "" || this.state.description1 == "" ? (
              <div className="content_justify blog-image">
                <div className="row">
                  <div className="col-md-12">
                    <img width="100%" src={this.state.image1}></img>
                    <div className="content_justify">
                      {renderHTML(this.state.description1)}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.description2 == "" ? null : (
              <div className="content_justify">
                {renderHTML(this.state.description2)}
              </div>
            )}

            <div className="row">
              <div className="col-md-12">
                <form onSubmit={this.handleSubmit}>
                  <div className="form">
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-12">
                          <h3>Comments:</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-12">
                          <input
                            className="form-control c_n_block square"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                          {this.validator.message(
                            "Name",
                            this.state.name,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-12">
                          <textarea
                            className="form-control c_n_block square"
                            style={{ height: "130px" }}
                            name="message"
                            rows="1"
                            placeholder="Comments"
                            value={this.state.message}
                            onChange={this.handleChange}
                          ></textarea>

                          {this.validator.message(
                            "message",
                            this.state.message,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-12">
                          <input
                            type="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            placeholder="select Emoji 😊"
                            style={{
                              border: "1px solid #ccc",
                              width: "95%",
                              marginRight: "10px",
                              height: "43px",
                            }}
                          />
                          <button
                            onClick={this.onClickButton}
                            style={{ height: "43px", width: "43px" }}
                          >
                            😊
                          </button>
                          {this.state.buttonclicked ? (
                            <span style={styles1.emojiPicker}>
                              <Picker onSelect={this.addEmoji} />
                            </span>
                          ) : null}
                          {this.validator.message(
                            "Reaction",
                            this.state.text,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn col-md-2 save_btn"
                            style={{ width: "auto" }}
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <Button constURL={this.state.url} />
            </div>
          </section>
          <section className="col-md-3"></section>
        </div>

        <Footer />
      </div>
    );
  }
}

export default BlogSpecific;
