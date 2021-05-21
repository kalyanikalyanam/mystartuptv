import React from 'react';
import firebase from '../Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";

class ViewNews extends React.Component{
  constructor(props){
    super(props);
    this.state={
        headline:'',
        content:'',
        url:'',
        category:'',
        created_on: new Date().toLocaleString(),
        date:'',
        status:'select',
        News:[],
        hashtag:'',
       count:0,  
       items: [],
       focused: false,
       input: ''
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {

          whitespace: {
              message: "The :attribute not allowed first whitespace   characters.",
              rule: function (val, params, validator) {
                  // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                  // params.indexOf(val) === -1
                  return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
              }
          },
          specialChar: {
              message: "The :attribute not allowed special   characters.",
              rule: function (val, params, validator) {
                  // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                  // params.indexOf(val) === -1
                  return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
              }
          },
          website: {
            message: "The Url should be example.com ",
            rule: function(val, params, validator) {
              //return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) && params.indexOf(val) === -1
              return (
                validator.helpers.testRegex(
                  val,
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                ) && params.indexOf(val) === -1
              );
            }
          },
          specialCharText: {
              message: "The :attribute may only contain letters, dot and spaces.",
              rule: function (val, params, validator) {
                  // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                  // params.indexOf(val) === -1
                  return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
              }
          }
      }
  });
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    componentDidMount() {
      const {editId} = this.props.match.params;
    
    console.log(editId);
    var ref=firebase.database().ref(`News2/${editId}`);
      ref.on('value', snapshot => {
          var data = snapshot.val();
          console.log(data)
          this.setState({
              headline: data.headline,
              content:data.content,
              url:data.url,
              created_on:data.created_on,
              category:data.category,
              date:data.date,
              items:data.items,
              hashtag:data.hashtag,

          });
         
          console.log(this.state.News);
      });
    }

    componentWillMount() {
      this.setState({ loading: true });
      var ref = firebase.database().ref("Categories/");
  
  
      ref.on('value', snapshot => {
          const data = [];
        
  
          snapshot.forEach(childSnapShot => {
            const Categories = {
              categoryId: childSnapShot.key.toString(),
              category: childSnapShot.val().category,
              created_on: childSnapShot.val().created_on,
            };
    
            data.push(Categories);
          });
    
          this.setState({ Categories:data,loading: false });
          console.log(this.state.Categories);
        }); }
  
    render(){

      


        return(
           
                
          <div>          
              
          <div className="container-fluid">
          <div className="row">
              <AdminHeader/>
                 <div className="user-dashboard">
                      <AdminSidebar/> 
                      <div className="col-md-10">                 
                      <h4><strong>Edit News</strong></h4>
                      <form onSubmit={this.handleSubmit}>
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>HeadLine:</h5></label>
                <div className="col-md-9">
             {this.state.headline}
             
                </div>
                
              </div>
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>URL:</h5></label>
                <div className="col-md-9">
                {this.state.url}
              
                </div>
          </div>
    
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>Description:</h5></label>
                <div className="col-md-9 ">
                 {this.state.content}</div>
    
              </div>
              <div className="form-group c_n_block">
          <label className="col-md-3"><h5>Select Category:</h5></label>
          <div className="col-md-9 ">
        {this.state.category} 
           </div>
      </div>
          <div className="form-group c_n_block">
                <label className="col-md-3"><h5>Date:</h5></label>
             <div className="col-md-9">  
             {this.state.date}
              
                </div>
    
     </div>
     <div className="form-group c_n_block">
            <label className="col-md-3"><h5>HashTag:</h5></label>
            <div className="col-md-9 ">
            
{this.state.items}



       </div>

          </div>
              <div class="form-group c_n_block">        
              <label className="col-md-3"><h5></h5></label>
              <div className="col-md-9">  
              {/* <button type="submit" class="btn col-md-2 save_btn">Save</button> &nbsp; */}

              <Link to="/Admin/EditNewsPage1">
          <button type="button" className="btn col-md-2 cancel_btn">Cancel</button>
          </Link>

              </div>
              </div>
            </form>  
                   </div>
                   </div>
          </div>
      </div>
      <AdminFooter/>
      </div>
          );
    
    }

}
export default ViewNews;