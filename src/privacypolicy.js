import React from "react";
import firebase from "./Config";
//import ReactPlayer from 'react-player';
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
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

            loading: false,
          });
        }
      });
  }
  render() {
    return (
      <div>
        <Header />

        <section className="colorarea bg-color">
          <div className="container">
            <div className="bgsizecover ">
              <h1 className="pgheadertitle animated mt-0 fadeInLeft pull-left head-pad">
                Privacy Policy
              </h1>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shortcode row">
                {renderHTML(this.state.content)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default PrivacyPolicy;
