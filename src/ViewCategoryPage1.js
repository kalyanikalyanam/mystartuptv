import React from 'react';
import {Link} from 'react-router-dom'; 
import firebase from './Config';
import ReactPlayer from 'react-player';
import "./index.css";
//import ReactHashtag from "react-hashtag";
//import ItemsCarousel from 'react-items-carousel';
//import * as moment from 'moment';
import Loaderpage from './Loaderpage';


class ViewCategoryPage1 extends React.Component{

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
             ipAddress:'',
             viewCount:'',
             activeItemIndex:'',  
             loading: false     
             };
    }
    componentDidMount(){
  
    
      this.setState({loading: false});
     
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
              hashtag:element.val().hashtag,
              
              date:element.val().date,
            }
            data.unshift(usersData);
          });
         
          this.setState({News:data,loading:true},()=>{
            console.log(this.state.News,'News');
          });
         

        })
        }

      
        
   
   
    render(){
      

        return(


			

this.state.News&&this.state.News.map((New,index) => {
              if(index==0)
                 return(
                 		
<div className="col-md-4 mb-10" key={index}>
<div className="category-box">
    
<div className="cate-head">
<h1>{New.category}</h1>
</div>
{this.state.loading?
<div className="cate-video">
<ReactPlayer width="100%" height="180"  url={New.url} controls frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></ReactPlayer>
		</div>
                      :
                      <div className="divLoader">
                          <Loaderpage/>
                      
                      </div>}
                               
   
<div className="cate-subhead">
<h1> <Link to={`/Specific/${New.newsId}`} onClick={this.handleSubmit}>{New.headline}</Link></h1>
</div>

<div className="see-more">
<span><Link to={`TopStartupNewsPage/${New.category}`}>SEE MORE <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link></span>
</div>

</div>

</div>
)
    })
          
       );
    }
}
export default ViewCategoryPage1;