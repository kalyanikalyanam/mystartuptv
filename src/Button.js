import React from 'react';
import firebase from './Config';
import { FacebookShareButton,WhatsappShareButton,EmailShareButton} from 'react-share';
import {  FacebookIcon, WhatsappIcon,EmailIcon} from  'react-share';
//import SubShareCSS from "./CSS";
 //import { FacebookShareCount } from 'react-share';
  
  class Button extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            News:[],
        };
    }
    // componentDidMount(){
      
    
    //   var ref=firebase.database().ref('News');
    //     ref.once("value",snapshot =>{
    //      const data =[];
    //       console.log(snapshot.val());
    //       snapshot.forEach(element => {
    //         const usersData={
    //           newsId:element.key.toString(),
    //           url:element.val().url,
    //           }
    //         data.unshift(usersData);
    //       });
    //           this.setState({News:data},()=>{
    //           console.log(this.state.News,'News');
    //       });
    //       })
    // }
    render(){
        return(



<div>    
<FacebookShareButton url={this.props.constURL} className="socail_display">
  {shareCount => (
    <span className="myShareCountWrapper">{shareCount}</span>
  )}
  <FacebookIcon size={32}/>
 </FacebookShareButton>
 
 
<WhatsappShareButton url={this.props.constURL} className="socail_display">
  {shareCount => (
    <span className="myShareCountWrapper">{shareCount}</span>
  )}
  <WhatsappIcon size={32}/>
 </WhatsappShareButton>

 <EmailShareButton url={this.props.constURL} className="socail_display">
  {shareCount => (
    <span className="myShareCountWrapper">{shareCount}</span>
  )}
  <EmailIcon size={32}/>
 </EmailShareButton>
</div>


        );
  }
}
export default Button;