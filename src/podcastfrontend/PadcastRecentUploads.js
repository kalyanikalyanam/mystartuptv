import React from "react";
import firebase from "./../Config";
import "./../index.css";
import * as moment from "moment";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
class PodcastRecentUploads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      image: "",
      mp3: "",
      created_on: new Date().toLocaleString(),
      Mp3: [],
      hashtag: "",
    };
  }
  componentDidMount() {
    var ref = firebase.database().ref("Mp3").limitToLast(4);
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          mp3Id: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          image: element.val().image,
          mp3: element.val().mp3,
          date: element.val().date,
          //hashtag:element.val().hashtag,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState({ Mp3: data }, () => {
        console.log(this.state.Mp3, "Mp3");
      });
    });
  }

  render() {
    return (
      <div>
        <section className="homerecentportfolio white-color fullwidth">
          <div className="container">
            <h3 className="class_bold mt_0">PODCAST RECENT UPLOADS</h3>
            <div className="row">
              {this.state.Mp3 &&
                this.state.Mp3.map((New, index) => {
                  return (
                    <div className="col-md-3 mb-20 ">
                      <PodcastView key={index} data={New} />{" "}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class PodcastView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      // <div>

      //      <h1 className="heading two_line" >{this.props.data.headline}</h1>
      //      <img src={this.props.data.image}></img>
      //      <audio controls src={this.props.data.mp3}>  </audio>
      //      <span className="duration">{this.state.duration}</span>

      //  </div>
      <div class="blog-artcle">
        <div class="blog-thumb">
          <Link
            to={`/PodcastSpecific/${this.props.data.mp3Id}`}
            target="_blank"
          >
            <img src={this.props.data.image} alt="blog thumb" />
          </Link>
        </div>
        <div class="blog-meta">
          <span>
            {moment(this.props.data.date).locale("en").format("DD-MM-YYYY")}
          </span>
        </div>
        <div class="blog-content">
          {/* <div className="hash">{this.props.data.hashtag} </div> */}
          <h2>
            <Link
              to={`/PodcastSpecific/${this.props.data.mp3Id}`}
              target="_blank"
            >
              {renderHTML(this.props.data.headline)}
            </Link>
          </h2>
          <audio controls src={this.props.data.mp3}>
            {" "}
          </audio>

          <div className="data_content">
            {renderHTML(this.props.data.content)}
          </div>

          {/* <Link to={`/PodcastSpecific/${this.props.data.mp3Id}`}  className="readmore_btn"target="_blank">Read more</Link>
           */}
        </div>
      </div>
    );
  }
}
export default PodcastRecentUploads;
