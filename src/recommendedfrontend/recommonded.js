import React from "react";
import firebase from "./../Config";
//import ReactPlayer from 'react-player';
import "./../index.css";
import Header from "./../Header";
import Footer from "./../Footer";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import Select from "react-select";

const options = [
  { value: "selected 1", label: "StartUp" },
  { value: "selected 2", label: "Mentor" },
  { value: "selected 3", label: "Investor" },
  { value: "selected 4", label: "panelist" },
];

class Recommonded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommonded_name: "",
      your_name: "",
      phoneno: "",
      email: "",
      select: "",
      selectedOption: null,
      status: "Unread",
      created_on: new Date().toLocaleString(),
      RecommondedList: [],
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
      var ref = firebase.database().ref("RecommondedList");

      ref
        .push({
          recommonded_name: this.state.recommonded_name,
          your_name: this.state.your_name,
          phoneno: this.state.phoneno,
          email: this.state.email,
          select: this.state.selectedOption,
          created_on: this.state.created_on,
          status: this.state.status,
        })
        .then((res) => {
          this.setState({
            recommonded_name: "",
            your_name: "",
            phoneno: "",
            email: "",
            select: "",
          });
          //this.props.history.push("/");
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

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
        <Header />

        <section className="colorarea bg-color">
          <div className="container">
            <div className="bgsizecover ">
              <h1 className="pgheadertitle animated mt-0 fadeInLeft pull-left head-pad">
                Recommended
              </h1>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shortcode row">
                <div className="col-md-6">
                  <div className="box1 contactform">
                    <div className="striped"></div>
                    <h6>
                      <i className=" fa fa-envelope "></i> Get in Touch{" "}
                    </h6>
                    <div style={{ height: "5px" }}></div>

                    <div className="done">
                      <div className="alert alert-success">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                        >
                          ??
                        </button>
                        Your message has been sent. Thank you!
                      </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form">
                        <div className="col-md-12 gap">
                          <div className="row">
                            <div className="col-md-6">
                              <input
                                className="form-control c_n_block square"
                                type="text"
                                name="recommonded_name"
                                placeholder="Recommonded Person Name"
                                value={this.state.recommonded_name}
                                onChange={this.handleChange}
                              />
                              {this.validator.message(
                                "Recommonded Person Name",
                                this.state.recommonded_name,
                                "required"
                              )}
                            </div>
                            <div className="col-md-6">
                              <input
                                className="form-control c_n_block square"
                                type="text"
                                name="your_name"
                                placeholder="Your Name"
                                value={this.state.your_name}
                                onChange={this.handleChange}
                              />
                              {this.validator.message(
                                "Your Name",
                                this.state.your_name,
                                "required"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 gap">
                          <input
                            className="form-control c_n_block square"
                            type="text"
                            name="phoneno"
                            placeholder="Phone Number"
                            value={this.state.phoneno}
                            onChange={this.handleChange}
                          />
                          {this.validator.message(
                            "phoneno",
                            this.state.phoneno,
                            "required"
                          )}
                        </div>

                        <div className="col-md-12 gap">
                          <input
                            className="form-control c_n_block square"
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                          {this.validator.message(
                            "email",
                            this.state.email,
                            "required"
                          )}
                        </div>
                        <div className="col-md-12 gap">
                          <Select
                            className="  c_n_block "
                            value={selectedOption}
                            onChange={this.handleChange1}
                            isMulti
                            name="select"
                            options={options}
                          />
                          {/* {this.validator.message("select", this.state.select, "required")} */}
                        </div>

                        <button type="submit" class="btn col-md-2 save_btn">
                          Submit
                        </button>
                      </div>
                    </form>

                    <span className="boxlink wowhideme ">
                      <a href=" " className="defaultbutton mainthemebgcolor">
                        <i className="fa fa-link"></i>
                      </a>
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="box1">
                    <div className="striped"></div>
                    <h6>
                      <i className=" fa fa-map-marker "></i> Location{" "}
                    </h6>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5381.6445587266335!2d78.53774663158394!3d17.48853498084445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b0d936c1761%3A0x2e867387e974a6b0!2s128%2C%20Defence%20Colony%2C%20Sainikpuri%2C%20Secunderabad%2C%20Telangana%20500094!5e0!3m2!1sen!2sin!4v1569917035649!5m2!1sen!2sin"
                      width="100%"
                      height="240"
                      frameBorder="0"
                      style={{ border: "0" }}
                      allowFullScreen=""
                    ></iframe>
                    <i className="fa fa-map-marker"></i> <i>Address</i>: Plot No
                    128, Defence Colony, Sainikipuri, Hyderabad 500094
                    <br />
                    {/*<i className="fa fa-clock-o"></i> <i>Hours</i>: Monday &#8211; Friday, 09:00 &#8211; 17:00<br/>*/}
                    <i className="fa fa-envelope"></i> <i>E-mail</i>:{" "}
                    <Link to="follow@mystartuptv.in">
                      follow@mystartuptv.in
                    </Link>
                    <br />
                    {/*<span className="boxlink "><Link to=" mailto:wowthemes.net " className="defaultbutton mainthemebgcolor"><i className="fa fa-link"></i></Link></span>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Recommonded;
