import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import Header from "./../Header";
import Footer from "./../Footer";
import "./../index.css";
import * as moment from "moment";
import renderHTML from "react-render-html";

class BlogSeperatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      image: "",
      hashtag: "",
      created_on: new Date().toLocaleString(),
      Blog: [],
      duration: "",
    };
  }
  componentDidMount() {
    const { categoryID } = this.props.match.params;
    var ref = firebase
      .database()
      .ref("Blog")
      .orderByChild("category")
      .equalTo(categoryID);
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          blogId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          image: element.val().image,
          schedule_date_number: element.val().schedule_date_number,
          category: element.val().category,
          created_on: element.val().created_on,
          counter: element.val().counter,
        };
        data.unshift(usersData);
      });
      const schedule1 = Date.now();
      var sortedKeys = data.filter((res) => {
        // console.log(res);

        return res.schedule_date_number <= schedule1;
      });
      this.setState({ Blog: sortedKeys }, () => {
        console.log(this.state.Blog, "Blog");
      });
    });
  }

  render() {
    const { categoryID } = this.props.match.params;
    return (
      <div>
        <Header />
        <section className="homerecentportfolio white fullwidth">
          <div className="container">
            <h3 className="class_bold mt_mb_25">{categoryID} </h3>
            {/* <h1 className="heading" style={{textTransform:"uppercase"}}>{categoryID} ></h1> */}
            <div className="row">
              {this.state.Blog &&
                this.state.Blog.map((New, index) => {
                  return <BlogView key={index} data={New} />;
                })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: "",
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="blog-artcle">
          <div className="blog-thumb">
            <Link to={`/BlogSpecific/${this.props.data.blogId}`}>
              <img src={this.props.data.image} alt="blog thumb" />
            </Link>
          </div>
          <div className="blog-meta">
            <span>
              {moment(this.props.data.date).locale("en").format("DD MM YYYY")}
            </span>
          </div>
          <div className="blog-content">
            {/* <div className="hash">{this.props.data.hashtag} </div> */}
            <h2>
              <a href={this.props.data.url} target="_blank">
                {renderHTML(this.props.data.headline)}{" "}
              </a>
            </h2>
            <div className="data_content">
              {renderHTML(this.props.data.content)}
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
export default BlogSeperatePage;
