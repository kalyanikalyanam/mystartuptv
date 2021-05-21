import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
//import ReactPlayer from 'react-player';
import "./../index.css";
//import ItemsCarousel from 'react-items-carousel';
//import * as moment from 'moment';
import renderHTML from "react-render-html";

class ViewMp3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      date: "",
      image: "",
      mp3: "",
      created_on: new Date().toLocaleString(),
      loading: false,
      Mp3: [],

      activeItemIndex: "",
    };
  }
  componentDidMount() {
    var ref = firebase
      .database()
      .ref("Mp3")
      .orderByChild("category")
      .equalTo(this.props.category);
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          mp3Id: element.key.toString(),
          headline: element.val().headline,
          image: element.val().image,
          content: element.val().content,
          mp3: element.val().mp3,
          category: element.val().category,
          created_on: element.val().created_on,
          date: element.val().date,
        };
        data.unshift(usersData);
      });

      this.setState({ Mp3: data, loading: true }, () => {
        console.log(this.state.Mp3, "Mp3");
      });
    });
  }
  // componentDidMount() {

  //     const {mp3Id} = this.props.match.params;

  //   console.log(mp3Id);

  //   var ref=firebase.database().ref(`Mp3/${mp3Id}`);
  //     ref.on('value', snapshot => {
  //        var   data = snapshot.val();

  //         this.setState({
  //             headline: data.headline,
  //             content:data.content,
  //             image:data.image,
  //             mp3:data.mp3,
  //             created_on:data.created_on,

  //         });

  //     });

  // }

  render() {
    return (
      this.state.Mp3 &&
      this.state.Mp3.map((Mp3, index) => {
        if (index == 0)
          return (
            <div className="col-md-4 mb-10" key={index}>
              <div className="artical-box">
                <div className="artical-box-head">
                  <h1>{Mp3.category}</h1>
                </div>

                <div className="artical-box-image">
                  <img src={Mp3.image} width="400px" height="400px"></img>
                </div>

                <div className="artical-box-subhead">
                  <h1>
                    <a href={Mp3.url} target="_blank">
                      {renderHTML(Mp3.headline)}
                    </a>
                  </h1>
                </div>
                {/* <audio controls src={Mp3.mp3} width="70%" style={{backgroundColor:"#444"}}>  </audio> */}

                <div className="artical-box-content_podcast">
                  {renderHTML(Mp3.content)}
                </div>

                <div className="artical-box-see-more">
                  <span>
                    <Link to={`PodcastSeperatePage/${Mp3.category}`}>
                      SEE MORE{" "}
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          );
      })
    );
  }
}
export default ViewMp3;
