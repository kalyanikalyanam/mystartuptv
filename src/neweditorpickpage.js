import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import ReactPlayer from 'react-player';
//import Loaderpage from './Loaderpage';
import "./index.css";
//import Button from './Button';


 
const styles = { height: 400, width: "100%" };

class EditorPickPage1 extends React.Component{
  constructor(props){
    super(props);
    this.state={
         headline:'',
         content:'',
         url:'',
         created_on:'',
         category:'',
         date:  new Date().toLocaleString(),
         News:[],
         autoplay:false,
         loading:false,
         duration:'',
        
    };
  }
  
  
  
  
  componentDidMount(){
    this.setState({loading: false});
   
  var ref=firebase.database().ref('News').orderByChild("status").equalTo("Selected");
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
          viewCount:element.val().viewCount,
          status:element.val().status,
        }
        data.unshift(usersData);
      });
     
     

         this.setState({News:data,loading:true},()=>{
          console.log(this.state.News,'News');
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
      console.log(hDisplay + mDisplay + sDisplay)
     
       this.setState({ duration })
    }


    
   
  
   
    render(){
     
const dataLen=this.state.News.length;
console.log(dataLen);
let { leftIcon, rightIcon } = this.state;

        return(
            
             <div className="container">
               
              
             <h3 className="slider_title">EDITOR'S PICKS</h3>
<section className="col-md-8">

   <div className="row">
            
               {this.state.News && this.state.News.map((New,index) => {
               return(
              <div style={{ ...styles, backgroundColor: "black" }}>
                <ReactPlayer width="100%" height="100%" url={New.url} onDuration={this.handleDuration}  className="carousel-center" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer> 
                
                  </div>
                  

               )})}
             
    </div>
   
</section>



     
 
<section className="col-md-4">
<div className="row">

{this.state.News && this.state.News.map((New,index) => {
  return(
              
             
              <div className="in_div" style={{height: "400px"}} > 
<ul>
  <li className="right_title"><strong ><Link to={`/Specific/${New.newsId}`}  style={{color:"white"}}>{New.headline}</Link></strong></li>
  <li className="time_size">{New.content}</li>
  <li className="time_size">{this.state.duration}</li>
  
  {/*<Button constURL={New.url} />*/}
</ul>
            
              
               </div>
               
              

               )})}
            
           
            </div>
</section> 
</div>


       );
    }
}




export default EditorPickPage1;