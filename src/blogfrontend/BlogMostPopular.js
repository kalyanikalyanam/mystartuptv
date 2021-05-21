import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import "./../index.css";
import * as moment from "moment";
import renderHTML from "react-render-html";

class BlogMostPopular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      image: "",
      created_on: new Date().toLocaleString(),
      Blog: [],
      duration: "",
      hashtag: "",
    };
  }

  componentDidMount() {
    const schedule1 = Date.now();
    var ref = firebase.database().ref("Blog");
    // .orderByChild("schedule_date_number")
    // .endAt(schedule1)
    // .limitToLast(4);
    ref.once("value", (snapshot) => {
      const data = [];
      snapshot.forEach((element) => {
        const usersData = {
          blogId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          image: element.val().image,
          schedule_date_number: element.val().schedule_date_number,
          created_on: element.val().created_on,
          count: element.val().count,
        };
        data.unshift(usersData);
      });

      var gstData = data.sort((a, b) => b.count - a.count).slice(0, 4);
      console.log(gstData);
      this.setState({ Blog: gstData }, () => {
        console.log(this.state.gstData, "Blog");
      });
    });
  }
  handleDuration = (duration) => {
    console.log(duration);

    var d = Number(duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var duration = hDisplay + mDisplay + sDisplay;
    console.log(hDisplay + mDisplay + sDisplay);

    this.setState({ duration });
  };

  render() {
    return (
      <div>
        <section className="homerecentportfolio white-color fullwidth">
          <div className="container">
            <h3 className="class_bold mt_0">BLOG MOST POPULAR</h3>
            <div className="row">
              {this.state.Blog &&
                this.state.Blog.map((New, index) => {
                  return (
                    <div className="col-md-3 mb-20 ">
                      <NewsView key={index} data={New} />{" "}
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

class NewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: "",
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleDuration = (duration) => {
    var d = Number(duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var duration = hDisplay + mDisplay + sDisplay;

    this.setState({ duration });
  };

  render() {
    return (
      <div className="blog-artcle">
        <div className="blog-thumb">
          <Link to={`/BlogSpecific/${this.props.data.blogId}`} target="_blank">
            {" "}
            <img src={this.props.data.image} alt="blog thumb" />
          </Link>
        </div>
        <div className="blog-meta">
          <span>
            {moment(this.props.data.date).locale("en").format("DD-MM-YYYY")}
          </span>
        </div>
        <div className="blog-content">
          {/* <div className="hash">{this.props.data.hashtag} </div> */}
          <h2>
            <Link
              to={`/BlogSpecific/${this.props.data.blogId}`}
              target="_blank"
            >
              {this.props.data.headline}
            </Link>
          </h2>
          <div className="data_content">
            {renderHTML(this.props.data.content)}{" "}
          </div>
          <Link
            to={`/BlogSpecific/${this.props.data.blogId}`}
            className="readmore_btn"
            target="_blank"
          >
            Read more
          </Link>
        </div>
      </div>
    );
  }
}
export default BlogMostPopular;
