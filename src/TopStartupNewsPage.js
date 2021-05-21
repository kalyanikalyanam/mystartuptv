import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import ReactPlayer from 'react-player';
import "./index.css";
//import ReactHashtag from "react-hashtag";
import Header from './Header';
import Footer from './Footer';
let ipAddress;
const publicIp = require('public-ip');
 


class TopStartupNewsPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
             headline:'',
             url:'',
             content:'',
             category:'',
             created_on:  new Date().toLocaleString(),
             News:[],
             TOPSTARTUPNEWS:[],
             duration:'',
             ipcount:"",
             listCount:'',
           
            
            };
    }
    componentDidMount(){
      const {categoryID}=this.props.match.params;
       var ref=firebase.database().ref('News').orderByChild("category").equalTo(categoryID);
        ref.once("value",snapshot =>{
         const data =[];
          console.log(snapshot.val());
          snapshot.forEach(element => {
            const usersData={
              newsId:element.key.toString(),
              headline:element.val().headline,
              url:element.val().url,
              content:element.val().content,
              category:element.val().category,
              //hashtag:element.val().hashtag,
              created_on:element.val().created_on,
              counter:element.val().counter,
            }
            data.unshift(usersData);
          });
         
          this.setState({TOPSTARTUPNEWS:data},()=>{
            console.log(this.state.TOPSTARTUPNEWS,'News');
          });
         })
       }
     


     
      


handleDuration = (duration) => {
console.log(duration);


 var  d = Number(duration);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
var duration = hDisplay + mDisplay + sDisplay;
 
   this.setState({ duration })
   console.log(this.state.duration);
}
 render(){
  const {categoryID}=this.props.match.params;
     return(
   <div>
         <Header/>
       <section className="homerecentportfolio grays fullwidth">
         <div className="container">
	     {/* <h1 className="heading" style={{textTransform:"uppercase"}}>{categoryID}</h1> */}
       <h3 className="class_bold mt_mb_25">{categoryID} </h3>
		<div className="row">
           
             {this.state.TOPSTARTUPNEWS&&this.state.TOPSTARTUPNEWS.map((New,index) => {
// 	         return( <div className="col-md-3" key={index} >
                   
// 		         <ReactPlayer width="600" height="350"  url={New.url}  onDuration={this.handleDuration}   frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
            
//                      <div>
 
//                        <h1 className="heading two_line"><Link to={`/Specific/${New.newsId}`}>{New.headline}</Link></h1>

//                       <hr className="lineheight"></hr>
                        
//                        <p id="two">{New.content}</p>
                           
//                       </div>
// 		                </div>
                    
                   
                             
//                     )

return (<NewsView  key={index}  data={New}/>)
                    
                    
                    })}
           
        </div>
        </div>
        </section>

		
<Footer/> 
</div>
	   );
    }
}



class NewsView extends React.Component{

  constructor(props){
      super(props);
      this.state={
        
           duration:'',
           
         
          
          };
  }
  componentDidMount(){
    console.log(this.props);
  }
  handleDuration = (duration) => {
   
     var  d = Number(duration);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
    
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var duration = hDisplay + mDisplay + sDisplay;
     
       this.setState({ duration })
      //  console.log(this.state.duration);
    }
  
     render(){
  return(
    <div className="col-md-3" >
                   
		         <ReactPlayer width="600" height="350"  url={this.props.data.url} controls onDuration={this.handleDuration}   frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
             {/* <div className="hash">{this.props.data.hashtag} </div> */}
                     <div>
 
                       <h1 className="heading two_line"><Link to={`/Specific/${this.props.data.newsId}`}>{this.props.data.headline}</Link></h1>
                     <p className="time_size">{this.state.duration}</p> 
                      <hr className="lineheight"></hr>
                        
                       {/* <p id="two">{this.props.data.content}</p> */}
                           
                      </div>
		                </div>
                    
  )
}
}
export default TopStartupNewsPage;