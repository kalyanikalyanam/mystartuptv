import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import "./../index.css";
import * as moment from "moment";
import renderHTML from "react-render-html";

class BlogRecentUploads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      image: "",
      date: "",

      Blog: [],
      hashtag: "",
    };
  }
  componentDidMount() {
    const schedule1 = Date.now();
    var ref = firebase
      .database()
      .ref("Blog")
      .orderByChild("schedule_date_number")
      .endAt(schedule1)
      .limitToLast(4);
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const schedule = element.val().schedule_date; //1618563960000

        const schedule1 = Date.now(); //1618394488912
        console.log(element.val().schedule_date);

        const usersData = {
          blogId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          image: element.val().image,
          date: element.val().date,
          schedule_date_number: element.val().schedule_date_number,
          //hashtag:element.val().hashtag,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState({ Blog: data }, () => {
        console.log(this.state.Blog, "Blog");
      });
    });
  }

  render() {
    return (
      <div>
        <section className="homerecentportfolio white-color fullwidth">
          <div className="container">
            <h3 className="class_bold mt_0">BLOG RECENT UPLOADS </h3>
            <div className="row">
              {this.state.Blog &&
                this.state.Blog.map((New, index) => {
                  return (
                    <div className="col-md-3 mb-20 ">
                      <BlogView key={index} data={New} />{" "}
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

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div className="blog-artcle">
          <div className="blog-thumb">
            <Link to={`/BlogSpecific/${this.props.data.blogId}`}>
              <img src={this.props.data.image} alt="blog thumb" />
            </Link>
          </div>

          <div className="blog-meta">
            <span>
              {moment(this.props.data.date).locale("en").format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="blog-content">
            {/* <div>{this.props.data.hashtag} </div> */}
            {/* <div className="hash">{this.props.data.hashtag} </div> */}
            <h2>
              <Link
                to={`/BlogSpecific/${this.props.data.blogId}`}
                target="_blank"
              >
                {renderHTML(this.props.data.headline)}
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
      </div>
    );
  }
}
export default BlogRecentUploads;
