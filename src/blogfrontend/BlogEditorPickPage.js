import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from "react-bootstrap-carousel";
import * as moment from "moment";
import renderHTML from "react-render-html";

const styles = { height: 400, width: "100%" };

class BlogEditorPickPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      url: "",
      created_on: "",
      category: "",
      image: "",
      date: new Date().toLocaleString(),
      Blog: [],
      autoplay: true,
      duration: "",
    };
  }

  componentDidMount() {
    var ref = firebase
      .database()
      .ref("Blog")
      .orderByChild("status")
      .equalTo("Selected");
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
          date: element.val().date,
          category: element.val().category,
          schedule_date_number: element.val().schedule_date_number,
          created_on: element.val().created_on,
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

  // handleDuration = (duration) => {
  //         console.log(duration);

  //        var  d = Number(duration);
  //         var h = Math.floor(d / 3600);
  //         var m = Math.floor(d % 3600 / 60);
  //         var s = Math.floor(d % 3600 % 60);

  //         var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  //         var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  //         var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  //    var duration = hDisplay + mDisplay + sDisplay;
  //         console.log(hDisplay + mDisplay + sDisplay)

  //          this.setState({ duration })
  //       }

  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = (active) => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? undefined : (
      <span className="glyphicon glyphicon-glass" />
    );
    rightIcon = rightIcon ? undefined : (
      <span className="glyphicon glyphicon-music" />
    );
    this.setState({ leftIcon, rightIcon });
  };

  render() {
    const dataLen = this.state.Blog.length;
    console.log(dataLen);
    let { leftIcon, rightIcon } = this.state;

    return (
      <div className="container">
        {/* <h3 className="class_bold slider_title">BLOG EDITOR'S PICKS</h3> */}
        <div className="row">
          <div className="col-md-8">
            <h3 className="class_bold slider_title">BLOG EDITOR'S PICKS</h3>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-3 slider_title">
                {/* <Link to="/subscribe"><strong className="subscribe">Subscribe</strong></Link> */}
                {/* <strong>Share on:</strong> */}
              </div>
              <div className="col-md-9 share_css slider_title">
                <a
                  href="https://www.facebook.com/mystartuptvin/"
                  className="facebook"
                >
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="https://twitter.com/mystartuptv" className="twitter">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                {/* <a href='#'className="whatsapp"><i className="fab fa-whatsapp" aria-hidden="true"></i></a> */}

                <a
                  href="https://www.linkedin.com/company/my-startup-tv"
                  className="linkedin"
                >
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a
                  href="https://www.instagram.com/mystartuptv/"
                  className="instagram"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className="col-md-12" style={{ padding: "0px" }}>
          <RBCarousel
            animation={true}
            autoplay={this.state.autoplay}
            slideshowSpeed={5000}
            defaultActiveIndex={0}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            onSelect={this.onSelect}
            ref={(r) => (this.slider = r)}
          >
            {this.state.Blog &&
              this.state.Blog.map((New, index) => {
                return <NewsView key={index} data={New} />;
              })}
          </RBCarousel>
        </section>
      </div>
    );
  }
}

const Row = (props) => <div className="row">{props.children}</div>;
const Col = (props) => (
  <div className={`col-xs-${props.span}`} style={props.style}>
    {props.children}
  </div>
);
const Button = (props) => {
  const { style, bsStyle, onClick } = props;
  const className = bsStyle ? `btn btn-${bsStyle}` : "btn";
  return (
    <button style={style} className={className} onClick={onClick}>
      {props.children}
    </button>
  );
};

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
      <>
        <section className="col-md-8">
          <div className="row">
            <div style={{ ...styles, backgroundColor: "black" }}>
              <img width="100%" src={this.props.data.image}></img>
            </div>
          </div>
        </section>

        <section className="col-md-4">
          <div className="row">
            <div className="in_div h-news">
              <ul>
                <li className="right_title">
                  <strong>
                    <Link
                      to={`/BlogSpecific/${this.props.data.blogId}`}
                      style={{ color: "white" }}
                    >
                      {renderHTML(this.props.data.headline)}
                    </Link>
                  </strong>
                </li>
                <li className="time_size">
                  {moment(this.props.data.date)
                    .locale("en")
                    .format("DD MM YYYY")}{" "}
                  {moment(this.props.data.date).locale("en").format("HH:mm")}
                </li>

                <li className="time_size">
                  {renderHTML(this.props.data.content)}
                </li>
                {/*<Button constURL={New.url} />*/}
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default BlogEditorPickPage;
