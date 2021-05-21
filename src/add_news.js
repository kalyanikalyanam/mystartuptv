import React from 'react';
import "../index.css";
import firebase from './Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from '../Sidebar';
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";


class AddNews extends React.Component{
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
  }
  
  handleSubmit=(event)=>{
    event.preventDefault();
    if (this.validator.allValid()) {
let data1;
if(this.state.date==''|| this.state.date==null){
 
  data1=this.state.created_on;
}else{
  data1=this.state.date;
}

    var ref = firebase.database().ref('News2');
     



                
    ref.push({ 
      headline:this.state.headline,
      content:this.state.content,
      url:this.state.url,
      category:this.state.category,
      created_on:this.state.created_on,
      status:this.state.status,
      items:this.state.items,
      date:data1,
      count:0,
    
    //  count:this.state.count,

    }).then(res=>{
    
      this.setState({headline:'',content:'',url:'',category:'',date:'',})
      this.props.history.push("/Admin/EditNewsPage1");
     });
    } else {
      this
          .validator
          .showMessages();
      this.forceUpdate();
  }
    
    };

    
        componentDidMount() {
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
        
 
handleChange=(event)=>{
  console.log(event.target.value);
  this.setState({
   [ event.target.name]: event.target.value,
  });
};

handleInputChange(evt) {
  this.setState({ input: evt.target.value });
}


handleInputKeyDown(evt) {
  if ( evt.keyCode === 13 ) {
    const {value} = evt.target;
    
    this.setState(state => ({
      items: [...state.items, value],
      input: '#'
    }));
  }

  if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
    this.setState(state => ({
      items: state.items.slice(0, state.items.length - 1)
    }));
  }
}

handleRemoveItem(index) {
  return () => {
    this.setState(state => ({
      items: state.items.filter((item, i) => i !== index)
    }));
  }
}


  render(){
    const styles = {
      container: {
        border: '1px solid #ddd',
        padding: '5px',
        borderRadius: '5px',
      },

      items: {
        display: 'inline-block',
        padding: '2px',
        border: '1px solid blue',
        fontFamily: 'Helvetica, sans-serif',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer'
      },

      input: {
        outline: 'none',
        border: 'none',
        fontSize: '14px',
        fontFamily: 'Helvetica, sans-serif'
      }
    };
    return(
        <div>          
              <div className="container-fluid">
      <div className="row">
          <AdminHeader/>
             <div className="user-dashboard">
                  <AdminSidebar/> 
                  <div className="col-md-10">                 
                  <h4><strong>Create News</strong></h4>
                  <form onSubmit={this.handleSubmit}>
          <div className="form-group c_n_block">
            <label className="col-md-3"><h5>HeadLine:</h5></label>
            <div className="col-md-9">
            <input className="text_fillwidth" type="text" name="headline" placeholder="Enter HeadLine"   value={this.state.headline} onChange={this.handleChange}/>
            {this.validator.message("HeadLine", this.state.headline, "required|whitespace|min:3")}
            </div>
            
          </div>
          <div className="form-group c_n_block">
            <label className="col-md-3"><h5>URL:</h5></label>
            <div className="col-md-9">
            <input className="text_fillwidth" type="url" name="url" placeholder="Enter URL" value={this.state.url} onChange={this.handleChange}/>
            {this.validator.message("URL", this.state.url, "required")}
            </div>
      </div>

        
          <div className="form-group c_n_block">
          <label className="col-md-3"><h5>Select Category:</h5></label>
          <div className="col-md-9 ">
         <select className="text_fillwidth" id="lang" name="category" onChange={this.handleChange}  value={this.state.category}> 
         <option>Select Category</option>
          {this.state.Categories && this.state.Categories.map((data,index) =>{
             return(
                      <option value={data.category} key={index}>{data.category}</option>
                    )
           } )}
          </select>
          
           {this.validator.message("category", this.state.category, "required")}
           </div>
      </div>
      <div className="form-group c_n_block">
            {/* <label className="col-md-3"><h5>HashTag:</h5></label>
            <div className="col-md-9 ">
              <textarea className="text_fillwidth" type="text" name="hashtag" placeholder="Enter HashTag" style={{width:"100%"}} className="longInput"  value={this.state.hashtag} onChange={this.handleChange}>
</textarea>           */}

<label className="col-md-3"><h5>HashTag:</h5></label>
        <ul className="col-md-9" style={styles.container}>
          {this.state.items.map((item, i) => 
            <li key={i} style={styles.items} onClick={this.handleRemoveItem(i)}>
              {item}
              <span>(x)</span>
            </li>
          )}
          <input

            style={styles.input}
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown} />
        </ul>
 
  {this.validator.message("Hashtag", this.state.items, "required")}
  {/* </div> */}

          </div>


      <div className="form-group c_n_block">
            <label className="col-md-3"><h5>Date:</h5></label>
         <div className="col-md-9">  
          <input className="text_fillwidth" type="datetime-local" name="date" style={{width:"100%"}} placeholder="" value={this.state.date} onChange={this.handleChange}/>
           
            </div>

 </div>


 <div className="form-group c_n_block">
            <label className="col-md-3"><h5>Description:</h5></label>
            <div className="col-md-9 ">
              <textarea className="text_fillwidth" type="text" name="content" placeholder="Enter Content" style={{width:"100%"}} className="longInput"  value={this.state.content} onChange={this.handleChange}>
</textarea>            {this.validator.message("Description", this.state.content, "required")}</div>

          </div>
 

       


          <div class="form-group c_n_block">        
          <label className="col-md-3"><h5></h5></label>
          <div className="col-md-9">  
          <button type="submit" class="btn col-md-2 save_btn">Save</button> 

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
export default AddNews;


