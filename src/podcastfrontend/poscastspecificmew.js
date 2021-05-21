import React from "react";
import firebase from "./../Config";
import "./../index.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//import RBCarousel from "react-bootstrap-carousel";
import Header from "./../Header";
import Footer from "./../Footer";
//import Loaderpage from './Loaderpage';
//import Scrollbar from 'react-smooth-scrollbar';
import * as moment from "moment";

const styles = { height: 400, width: "100%" };

class PodcastSpecific extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      url: "",
      image: "",
      created_on: new Date().toLocaleString(),
      category: "",
      date: "",
      mp3: "",
      Mp3: [],
      autoplay: false,
      duration: "",
      count: 0,
    };
  }

  componentDidMount() {
    const { mp3Id } = this.props.match.params;

    console.log(mp3Id);
    let dataCount = 0;
    var ref = firebase.database().ref(`Mp3/${mp3Id}`);
    ref.on("value", (snapshot) => {
      var data = snapshot.val();
      dataCount = snapshot.val().count;
      console.log(dataCount);
      this.setState({
        headline: data.headline,
        content: data.content,
        url: data.url,
        image: data.image,
        mp3: data.mp3,
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
    const { mp3Id } = this.props.match.params;
    var ref = firebase.database().ref(`Mp3/${mp3Id}`);

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

  render() {
    const dataLen = this.state.mp3.length;
    let { leftIcon, rightIcon } = this.state;

    return (
      <div>
        <Header />

        <div className="container">
          <h4>&nbsp;</h4>
          <section className="col-md-9">
            <h2>{this.state.headline}</h2>

            <img src={this.state.image} width="100%"></img>

            <div className="audio-width audio_specific">
              <audio controls src={this.state.mp3}>
                {" "}
              </audio>
            </div>

            <div>{this.state.content}</div>

            <div className="time_size podcast_date">
              {moment(this.state.date).locale("en").format("DD MM YYYY")}
            </div>

            {/* <div className="row">
<div className="col-md-3">     
<strong>Share:</strong>
               </div>        
               <div className="col-md-3">     
                            <a  href='#'><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href='#'><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href='#'><i className="fab fa-whatsapp" aria-hidden="true"></i></a>
                            <a href='#'><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                            </div>
                            </div> */}
          </section>
          <section className="col-md-3"></section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PodcastSpecific;
