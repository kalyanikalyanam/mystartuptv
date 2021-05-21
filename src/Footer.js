import React from "react";

import firebase from "./Config";
import { Link } from "react-router-dom";
// import Editor from "./Editor";
import SimpleReactValidator from "simple-react-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const styles = {
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
class Footer extends React.Component {
  // editor = null;
  // id = Date.now();

  // state = {
  //   html: "",
  // };
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      text: "",
      buttonclicked: false,
      message: "",
      created_on: new Date().toLocaleString(),
      Comments: [],
      status: "Unread",
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
    var ref = firebase
      .database()
      .ref("comments")
      .ref.once("value", (snapshot) => {
        const data = [];
        console.log(snapshot.val());
        snapshot.forEach((element) => {
          const usersData = {
            commentsId: element.key.toString(),
            message: element.val().message,
            text: element.val().text,
            created_on: element.val().created_on,
          };
          data.unshift(usersData);
        });

        this.setState({ Comments: data }, () => {
          console.log(this.state.Comments, "Comments");
        });
      });
  }

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
          //this.props.history.push("/");
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  // onChange = (html) => {
  //   console.log(html);

  //   this.setState({ html });
  // };
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
    return (
      <div>
        <div className="beforefooter"></div>
        <footer id="colophon" className="site-footer " role="contentinfo">
          <div className="footerbottom">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <p id="back-top">
                    <a href="#top">
                      <span>
                        <i className="fa fa-chevron-up"></i>
                      </span>
                    </a>
                  </p>
                  &copy; 2019 My Startup Tv. All Rights Reserved.
                </div>
                {/* <form onSubmit={this.handleSubmit}>
                  <div className="form">
                    <div className="col-md-12 gap">
                      <div className="row">
                        <div className="col-md-6">
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

                        <div className="col-md-6">
                          <textarea
                            className="form-control c_n_block square"
                            name="message"
                            rows="1"
                            placeholder="Message"
                            value={this.state.message}
                            onChange={this.handleChange}
                          ></textarea>
                          {this.validator.message(
                            "message",
                            this.state.message,
                            "required"
                          )}
                        </div>
                        <input
                          type="text"
                          value={this.state.text}
                          onChange={this.handleChange}
                          placeholder="Type a message here then hit ENTER"
                          style={{ border: "2px solid red", width: "80%" }}
                        />
                        <button onClick={this.onClickButton}>
                          Reaction
                          <span>
     <Picker onSelect={this.addEmoji} />
  </span>
                        </button>
                        {this.state.buttonclicked ? (
                          <span style={styles.emojiPicker}>
                            <Picker onSelect={this.addEmoji} />
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <button type="submit" className="btn col-md-2 save_btn">
                      Submit
                    </button>
                  </div>
                </form> */}

                {/* {this.state.Comments.map((comments, index) => {
                  console.log(comments);
                  return <p>{comments.text}</p>;
                })} */}
                <div className="col-md-8 smallspacetop">
                  <div className="pull-right smaller">
                    <ul id="menu-footer" className="footermenu">
                      <li>
                        <Link to="/ContactUs" data-target="#">
                          ContactUs
                        </Link>
                      </li>
                      <li>
                        <Link to="/workwithus">Work With Us</Link>
                      </li>
                      <li>
                        <Link to="/advertisewithus">Advertise With Us</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/cookie-policy">Cookie Policy</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
