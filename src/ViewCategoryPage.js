import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import ReactPlayer from 'react-player';
import "./index.css";
import ItemsCarousel from 'react-items-carousel';
import * as moment from 'moment';

class ViewCategoryPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
             headline:'',
             url:'',
             content:'',
             category:'',
             date:'',
             created_on:  new Date().toLocaleString(),
             loading:false,
             News:[],
             TOPSTARTUPNEWS:[],
             POWEROFWOMENPRENEURS:[],
             THEWANTREPRENEURSSHOW:[],
             THEMICROBUSINESSSHOW:[],
             OURSOLDIERPRENEURS:[],
             YOUNGINNOVATORS:[],
             INSPIREMETODAY:[],
             AgriTech:[],
             HealthCare:[],
             IOT:[],
             activeItemIndex:'',  
             duration:'',     
             };
    }
    componentDidMount(){
        var ref=firebase.database().ref('News').orderByChild("category").equalTo(this.props.category);
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
              date:element.val().date,
            }
            data.unshift(usersData);
          });
         
          this.setState({TOPSTARTUPNEWS:data,loading:true},()=>{
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
          console.log(hDisplay + mDisplay + sDisplay)
         
           this.setState({ duration })
        }
   
   
    render(){
      

        return(


			

<div>
  <ItemsCarousel
    gutter={12}
    activePosition={'center'}
    chevronWidth={100}
    numberOfCards={4}
    slidesToScroll={4}
    outsideChevron={true}
    showSlither={false}
    firstAndLastGutter={false}
    activeItemIndex={this.state.activeItemIndex}
	requestToChangeActive={value => this.setState({ activeItemIndex: value })}
	
    rightChevron={'>>'}
    leftChevron={'<<'}
  >
   
   {this.state.TOPSTARTUPNEWS&&this.state.TOPSTARTUPNEWS.map((New,index) => {
	   return(
      <div key={index}>
       
		  <ReactPlayer width="600" height="350"  url={New.url}  onDuration={this.handleDuration} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
		 <div><h1 className="heading two_line" ><Link to={`/Specific/${New.newsId}`}>{New.headline}</Link></h1>
     {/* <span>{this.state.duration}</span> */}
    <span>Date: {moment(New.date).locale("en").format("DD-MM-YYYY")}</span>
    <span className="pull-right">Time: {moment(New.date).locale("en").format("HH:mm")}</span>
    <hr className="lineheight">

    </hr>
                      <p id="two">{New.content}</p></div>
		</div>)
    })}
  </ItemsCarousel>


 



</div>
							
							
							
						
			



	

		


               
            
               
       );
    }
}
export default ViewCategoryPage;