// import React from 'react';
// import {Link} from 'react-router-dom';
// import firebase from './Config';
// import ReactPlayer from 'react-player';
// import "./index.css";
// //import ItemsCarousel from 'react-items-carousel';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// //import * as moment from 'moment';

// class MostPopular extends React.Component{

//     constructor(props){
//         super(props);
//         this.state={
//              headline:'',
//              url:'',
//              content:'',
//              category:'',
//              created_on:  new Date().toLocaleString(),
//              News:[],
//              duration:'',

//         };
//     }
//     componentDidMount(){
//         var ref=firebase.database().ref('News').limitToLast(8);
//         ref.once("value",snapshot =>{
//          const data =[];

//           snapshot.forEach(element => {
//             const usersData={
//               newsId:element.key.toString(),
//               headline:element.val().headline,
//               url:element.val().url,
//               content:element.val().content,
//               category:element.val().category,
//               created_on:element.val().created_on,
//               count:element.val().count,
//             }
//             data.unshift(usersData);
//           });
//       var gstData= data.sort((a, b) => b.count - a.count);
//          console.log(gstData);
//           this.setState({News:gstData},()=>{
//             console.log(this.state.gstData,'News');
//           });
//         })
//         }

//         handleDuration = (duration) => {

//          var  d = Number(duration);
//           var h = Math.floor(d / 3600);
//           var m = Math.floor(d % 3600 / 60);
//           var s = Math.floor(d % 3600 % 60);

//           var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//           var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//           var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//      var duration = hDisplay + mDisplay + sDisplay;
//           // console.log(hDisplay + mDisplay + sDisplay)

//            this.setState({ duration })
//         }

//     render(){
//       // const responsive = {
//       //   desktop: {
//       //     breakpoint: { max: 3000, min: 1024 },
//       //     items: 4,
//       //     slidesToSlide: 4, // optional, default to 1.
//       //   },
//       //   tablet: {
//       //     breakpoint: { max: 1024, min: 464 },
//       //     items: 2,
//       //     slidesToSlide: 2, // optional, default to 1.
//       //   },
//       //   mobile: {
//       //     breakpoint: { max: 464, min: 0 },
//       //     items: 2,
//       //     slidesToSlide: 1, // optional, default to 1.
//       //   },
//       // };
//         return(

// <div>
// <section className="homerecentportfolio white-color fullwidth">
// 		<div className="container">
// <h3><b>MOST POPULAR</b></h3>
// <div>

// <Carousel
//   additionalTransfrom={0}
//   arrows
//   autoPlaySpeed={3000}
//   centerMode={false}
//   className=""
//   containerClass="container"
//   dotListClass=""
//   draggable
//   focusOnSelect={false}
//   infinite={false}
//   itemClass=""
//   keyBoardControl
//   minimumTouchDrag={80}
//   renderButtonGroupOutside={false}
//   renderDotsOutside={false}
//   responsive={{
//     desktop: {
//       breakpoint: {
//         max: 3000,
//         min: 1024
//       },
//       items: 3,
//       partialVisibilityGutter: 40
//     },
//     mobile: {
//       breakpoint: {
//         max: 464,
//         min: 0
//       },
//       items: 1,
//       partialVisibilityGutter: 30
//     },
//     tablet: {
//       breakpoint: {
//         max: 1024,
//         min: 464
//       },
//       items: 2,
//       partialVisibilityGutter: 30
//     }
//   }}
//   showDots={false}
//   sliderClass=""
//   slidesToSlide={2}
//   swipeable
// >

//    {this.state.News&&this.state.News.map((New,index) => {
//      //if(index<=7)
// 	  //  return(
//     //   <div key={index}>
// 		//   <ReactPlayer width="100%" height="180" url={New.url} onDuration={this.handleDuration} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
// 		//   <div>
//     //     <h1 className="heading two_line" ><Link to={`/Specific/${New.newsId}`}>{New.headline}</Link></h1>
//     //     <span>{this.state.duration}</span>
//     //       <span>Date: {moment(New.date).locale("en").format("DD-MM-YYYY")}</span>
//     //       <span className="pull-right">Time: {moment(New.date).locale("en").format("HH:mm")}</span>
//     //       <hr className="lineheight"></hr>
//     //      <p id="two">{New.content}</p>
//     //      </div>
//     // </div>

//     // )
//     return (<NewsView  key={index}  data={New}/>)
//     })}
//   </Carousel>
// </div>
// </div>
// </section>
// </div>
//        );
//     }
// }

// class NewsView extends React.Component{

//   constructor(props){
//       super(props);
//       this.state={

//            duration:'',

//           };
//   }
//   componentDidMount(){
//     console.log(this.props);
//   }
//   handleDuration = (duration) => {

//      var  d = Number(duration);
//       var h = Math.floor(d / 3600);
//       var m = Math.floor(d % 3600 / 60);
//       var s = Math.floor(d % 3600 % 60);

//       var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//       var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//       var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//     var duration = hDisplay + mDisplay + sDisplay;

//        this.setState({ duration })

//     }

//      render(){
//   return(
//     <div>
// 		   <ReactPlayer width="100%" height="180" url={this.props.data.url} onDuration={this.handleDuration} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
// 		   <div>
//          <h1 className="heading two_line" ><Link to={`/Specific/${this.props.data.newsId}`}>{this.props.data.headline}</Link></h1>
//          <span className="duration">{this.state.duration}</span>
//            {/* <span>Date: {moment(New.date).locale("en").format("DD-MM-YYYY")}</span>
//            <span className="pull-right">Time: {moment(New.date).locale("en").format("HH:mm")}</span> */}
//            {/* <hr className="lineheight"></hr> */}
//           {/* <p id="two">{this.props.data.content}</p> */}
//           </div>
//      </div>

//   )
// }
// }

// export default MostPopular;

import React from "react";
import { Link } from "react-router-dom";
import firebase from "./Config";
import ReactPlayer from "react-player";
import "./index.css";
import ReactHashtag from "react-hashtag";
//import ItemsCarousel from 'react-items-carousel';

//import * as moment from 'moment';

class MostPopular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      created_on: new Date().toLocaleString(),
      News: [],
      duration: "",
      hashtag: "",
    };
  }
  // componentDidMount(){

  //     var ref=firebase.database().ref('News').limitToLast(4);
  //     ref.once("value",snapshot =>{
  //      const data =[];
  //       console.log(snapshot.val());
  //       snapshot.forEach(element => {
  //         const usersData={

  //           newsId:element.key.toString(),
  //           headline:element.val().headline,
  //           url:element.val().url,
  //           content:element.val().content,
  //           category:element.val().category,
  //           created_on:element.val().created_on
  //         }
  //         data.unshift(usersData);
  //       });

  //       this.setState({News:data},()=>{
  //         console.log(this.state.News,'News');

  //       });
  //     })

  //     }

  componentDidMount() {
    var ref = firebase.database().ref("News");
    ref.once("value", (snapshot) => {
      const data = [];

      snapshot.forEach((element) => {
        const usersData = {
          newsId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          created_on: element.val().created_on,
          //hashtag:element.val().hashtag,
          count: element.val().count,
        };
        data.unshift(usersData);
      });
      var gstData = data.sort((a, b) => b.count - a.count).slice(0, 4);
      console.log(gstData);
      this.setState({ News: gstData }, () => {
        console.log(this.state.gstData, "News");
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
            <h3 className="class_bold mt_0">MOST POPULAR</h3>
            <div className="row">
              {/* <ItemsCarousel
    gutter={12}
    activePosition={'center'}
    chevronWidth={100}
    numberOfCards={4}
    slidesToScroll={2}
    outsideChevron={true}
    showSlither={false}
    firstAndLastGutter={false}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={'<'}
    leftChevron={'<'}
  > */}

              {this.state.News &&
                this.state.News.map((New, index) => {
                  //  return(
                  //if(index<=7)
                  //   <div key={index}>
                  //   <ReactPlayer width="100%" height="180" url={New.url} onDuration={this.handleDuration} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
                  //   <div><h1 className="heading two_line" ><Link to={`/Specific/${New.newsId}`}>{New.headline}</Link></h1>
                  //   <span>{this.state.duration}</span>
                  //       {/* <span>Date: {moment(New.date).locale("en").format("DD-MM-YYYY")}</span>
                  //       <span className="pull-right">Time: {moment(New.date).locale("en").format("HH:mm")}</span> */}
                  //       {/* <hr className="lineheight"></hr> */}
                  //      {/* <p id="two">{New.content}</p> */}
                  //      </div>
                  // </div>)
                  return (
                    <div className="col-md-3 mb-20 ">
                      <NewsView key={index} data={New} />{" "}
                    </div>
                  );
                })}
              {/* </ItemsCarousel> */}
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
      <div>
        <ReactPlayer
          width="100%"
          height="180"
          url={this.props.data.url}
          controls
          onDuration={this.handleDuration}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></ReactPlayer>
        {/* <div className="hash">{this.props.data.hashtag}</div> */}
        <div>
          <h1 className="heading two_line">
            <Link to={`/Specific/${this.props.data.newsId}`}>
              {this.props.data.headline}
              {/* {this.props.data.count} */}
            </Link>
          </h1>
          <span className="duration">{this.state.duration}</span>

          {/* <span>Date: {moment(New.date).locale("en").format("DD-MM-YYYY")}</span>
           <span className="pull-right">Time: {moment(New.date).locale("en").format("HH:mm")}</span> */}
          {/* <hr className="lineheight"></hr> */}
          {/* <p id="two">{this.props.data.content}</p> */}
        </div>
      </div>
    );
  }
}
export default MostPopular;
