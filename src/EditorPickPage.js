import React from "react";
import { Link } from "react-router-dom";
import firebase from "./Config";
import ReactPlayer from "react-player";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from "react-bootstrap-carousel";
import Loaderpage1 from "./Loaderpage1";

const styles = { height: 400, width: "100%" };

class EditorPickPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      url: "",
      created_on: "",
      category: "",
      date: new Date().toLocaleString(),
      News: [],
      autoplay: true,
      duration: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });

    var ref = firebase
      .database()
      .ref("News")
      .orderByChild("status")
      .equalTo("Selected");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          newsId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState({ News: data, loading: true }, () => {
        console.log(this.state.News, "News");
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
    const dataLen = this.state.News.length;
    console.log(dataLen);
    let { leftIcon, rightIcon } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h3 className="class_bold slider_title">EDITOR'S PICKS</h3>
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
            {this.state.News &&
              this.state.News.map((New, index) => {
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

      loading: false,
    };
  }
  // componentDidMount(){
  //   console.log(this.props);
  // }
  componentDidMount() {
    this.setState({ loading: false });

    var ref = firebase
      .database()
      .ref("News")
      .orderByChild("status")
      .equalTo("Selected");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          newsId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState({ News: data, loading: true }, () => {
        console.log(this.state.News, "News");
      });
    });
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
            <div style={{ ...styles, backgroundColor: "black" }}></div>
            {this.state.loading ? (
              <ReactPlayer
                width="100%"
                height="100%"
                url={this.props.data.url}
                controls
                onDuration={this.handleDuration}
                className="carousel-center"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></ReactPlayer>
            ) : (
              <div className="divLoader1">
                <Loaderpage1 />
              </div>
            )}
          </div>
        </section>

        <section className="col-md-4">
          <div className="row">
            <div className="in_div h-news">
              <ul>
                <li className="right_title">
                  <strong>
                    <Link
                      to={`/Specific/${this.props.data.newsId}`}
                      style={{ color: "white" }}
                    >
                      {this.props.data.headline}
                    </Link>
                  </strong>
                </li>
                <li className="time_size">{this.props.data.content}</li>
                <li className="time_size">{this.state.duration}</li>

                {/*<Button constURL={New.url} />*/}
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default EditorPickPage;
