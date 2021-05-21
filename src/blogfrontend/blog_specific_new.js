import React from "react";
import "./../index.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import firebase from "./../Config";
import Header from "./../Header";
import Footer from "./../Footer";
import Button from "./../Button";
import renderHTML from "react-render-html";

const styles = { height: 300, width: "100%" };

class BlogSpecific extends React.Component {
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
      Blog: [],
      autoplay: false,
      duration: "",
      count: 0,
      theme: "snow",
    };
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
        url: data.url,
        image: data.image,
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

  render() {
    const dataLen = this.state.Blog.length;
    let { leftIcon, rightIcon } = this.state;

    return (
      <div>
        <Header />

        <div className="container">
          <section className="col-md-9">
            <div className="blog-image">
              <img width="100%" src={this.state.image}></img>
            </div>
            <div className="content_justify">
              <h2>
                <strong>{this.state.headline}</strong>
              </h2>
            </div>
            <div className="content_justify">
              {renderHTML(this.state.content)}
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
