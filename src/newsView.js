import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import ReactPlayer from 'react-player';
import "./index.css";

import Header from './Header';
import Footer from './Footer';
let ipAddress;
const publicIp = require('public-ip');
 
(async () => {
  ipAddress =await publicIp.v4();
    console.log(ipAddress);
})();

class newsView extends React.Component{

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
// var filler = [];
// var fLen =this.state.TOPSTARTUPNEWS.length;
// console.log(fLen);

// for(var i=0;i<=fLen;i++){
//   filler.push(duration)
// }

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
	     <h1 className="heading" style={{textTransform:"uppercase"}}>{categoryID} ></h1>
		<div className="row">
           
             {this.state.TOPSTARTUPNEWS&&this.state.TOPSTARTUPNEWS.map((New,index) => {
	         return( <div className="col-md-3" key={index} >
                   
		         <ReactPlayer width="600" height="350"  url={New.url}  onDuration={this.handleDuration}   frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
            
                     <div>
 
                       <h1 className="heading two_line"><Link to={`/Specific/${New.newsId}`}>{New.headline}</Link></h1>
{index==1?                       <p className="time_size">{this.state.duration}</p> 
:''}
                      <hr className="lineheight"></hr>
                        
                       <p id="two">{New.content}</p>
                           
                      </div>
		                </div>
                    
                   
                             
                    )})}
           
        </div>
        </div>
        </section>

		
<Footer/> 
</div>
	   );
    }
}
export default TopStartupNewsPage;