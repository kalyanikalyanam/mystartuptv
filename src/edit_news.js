import React from 'react';
import firebase from './Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from '../Sidebar';
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";

class EditNews extends React.Component{
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
    handleChange=(event)=>{
        console.log(event.target.value);
        this.setState({
         [ event.target.name]: event.target.value,
        });
      };
  
  handleSubmit=(event)=>{
   
        const {editId} = this.props.match.params;
        
            event.preventDefault();
            if (this.validator.allValid()) {
            
            let reff= firebase.database().ref(`/News2/${editId}`);
            console.log(reff);
        reff.update({
                content: this.state.content,
                headline: this.state.headline,
                url: this.state.url,
                created_on: this.state.created_on,
                category:this.state.category,
               
                items:this.state.items,
                date:this.state.date,
            });

            this.setState({headline: this.state.headline, 
            url: this.state.url,
            content: this.state.content,
            date:this.state.date,
            
            items:this.state.items,
            category:this.state.category,});
            this.props.history.push("/Admin/EditNewsPage1");
          } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }
           
        }
        
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
                      <h4><strong>Edit News</strong></h4>
                      <form onSubmit={this.handleSubmit}>
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>HeadLine:</h5></label>
                <div className="col-md-9">
                <input className="text_fillwidth" type="text" name="headline" placeholder="HeadLine"  value={this.state.headline} onChange={this.handleChange}/>
                {this.validator.message("HeadLine", this.state.headline, "required|whitespace|min:3|max:70")}
                </div>
                
              </div>
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>URL:</h5></label>
                <div className="col-md-9">
                <input className="text_fillwidth" type="url" name="url" placeholder="" value={this.state.url} onChange={this.handleChange}/>
                {this.validator.message("URL", this.state.url, "required")}
                </div>
          </div>
    
              <div className="form-group c_n_block">
                <label className="col-md-3"><h5>Description:</h5></label>
                <div className="col-md-9 ">
                  <textarea className="text_fillwidth" type="text" name="content" placeholder="Content" style={{width:"100%"}} className="longInput"  value={this.state.content} onChange={this.handleChange}>
    </textarea>            {this.validator.message("Description", this.state.content, "required")}</div>
    
              </div>
              <div className="form-group c_n_block">
          <label className="col-md-3"><h5>Select Category:</h5></label>
          <div className="col-md-9 ">
         <select className="text_fillwidth" id="lang" name="category" onChange={this.handleChange}  value={this.state.category}> 
          {this.state.Categories && this.state.Categories.map((data,index) =>{
             return(
                      <option value={data.category} selected={this.state.category==data.category} key={index}>{data.category}</option>
                    )
           } )}
          </select>
          
           {this.validator.message("category", this.state.category, "required")}
           </div>
      </div>
          <div className="form-group c_n_block">
                <label className="col-md-3"><h5>Date:</h5></label>
             <div className="col-md-9">  
              <input className="text_fillwidth" type="datetime-local" name="date" style={{width:"100%"}} placeholder="" value={this.state.date} onChange={this.handleChange}/>
              
                </div>
    
     </div>
     <div className="form-group c_n_block">
            {/* <label className="col-md-3"><h5>HashTag:</h5></label>
            <div className="col-md-9 ">
              <textarea className="text_fillwidth" type="text" name="hashtag" placeholder="Enter HashTag" style={{width:"100%"}} className="longInput"  value={this.state.hashtag} onChange={this.handleChange}>
</textarea>      */}


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
       {/* {this.validator.message("Hashtag", this.state.hashtag, "required")} */}
       </div>

          {/* </div> */}
              <div class="form-group c_n_block">        
              <label className="col-md-3"><h5></h5></label>
              <div className="col-md-9">  
              <button type="submit" class="btn col-md-2 save_btn">Save</button> &nbsp;

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
export default EditNews;