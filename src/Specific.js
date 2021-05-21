import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import "./index.css";
import ReactPlayer from 'react-player';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//import RBCarousel from "react-bootstrap-carousel";
import Header from './Header';
import Footer from './Footer';
//import Loaderpage from './Loaderpage';
import Scrollbar from 'react-smooth-scrollbar';



const styles = { height: 400, width: "100%" };

class Specific extends React.Component{
  constructor(props){
    super(props);
    this.state={
         headline:'',
         content:'',
         url:'',
         created_on:new Date().toLocaleString(),
         category:'',
         date:'',  
         News:[],
         autoplay:false,
         duration:'',
         count:0,
        
    };
  }
  
  componentDidMount() {
   
    const {newsId} = this.props.match.params;
  
  console.log(newsId);
  let dataCount=0;
  var ref=firebase.database().ref(`News/${newsId}`);
    ref.on('value', snapshot => {
       var   data = snapshot.val();
       dataCount=snapshot.val().count;
        console.log(dataCount)
        this.setState({
            headline: data.headline,
            content:data.content,
            url:data.url,
            created_on:data.created_on,
            date:data.date,
            count:data&&data.count,
          

        },
        );
        console.log(this.state.count);
        
    });
    setTimeout(() => this.countUpdate(this.state.count), 5000);
    


}
countUpdate =(count)=>{
  console.log(count);
  const {newsId} = this.props.match.params;
     var ref=firebase.database().ref(`News/${newsId}`);
        
             ref.update({
               count:count+1
             })
        
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
  console.log(hDisplay + mDisplay + sDisplay)
  // return hDisplay + mDisplay + sDisplay; 

  // console.log('onDuration', duration)
   this.setState({ duration })
}
   
    render(){
     
const dataLen=this.state.News.length;
let { leftIcon, rightIcon } = this.state;

        return(
          <div>
           
           <Header/>
             <div className="container">
                <h4>&nbsp;</h4>
<section className="col-md-8">

              <div style={{ ...styles, backgroundColor: "black" }}>
                <ReactPlayer width="100%" height="100%" url={this.state.url} controls onDuration={this.handleDuration} className="carousel-center" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer> 
              </div>
             
</section>


<section className="col-md-4">

<div className="scrollblock"> 
<Scrollbar  
                damping={1.0}
                thumbMinSize={20}
                syncCallbacks={true}
                renderByPixels={true}
                alwaysShowTracks={false}
                continuousScrolling={true} 
            >
             <div className="in_div pt-0 pb-0"> 
             <p className="right_title news-font">{this.state.content}</p>
             <p className="time_size">{this.state.duration}</p>
             </div>
             </Scrollbar>
             </div>

</section>

</div>

<Footer/>

</div>
       );
    }
}




export default Specific;




