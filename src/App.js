import React from 'react';
import "./index.css";
import firebase from './Config';


class App extends React.Component{
  constructor(props){
    super(props);
        this.state={
         headline:'',
         content:'',
         url:'',
         category:'TopNews',
         created_on: new Date().toLocaleString(),
         status:'select',
         News:[],
        
        };
  }
  
  handleSubmit=(event)=>{
    event.preventDefault();
    var ref = firebase.database().ref('News');
     
    ref.push({ 
      headline:this.state.headline,
      content:this.state.content,
      url:this.state.url,
      category:this.state.category,
      created_on:this.state.created_on,
      status:this.state.status,

    }).then(res=>{
    
      this.props.history.push("/ViewNewsPage");
     });
    
    
    };

  
 
handleChange=(event)=>{
  console.log(event.target.value);
  this.setState({
   [ event.target.name]: event.target.value,
  });
};


  render(){
    
      return(
        <div>
      
              
        <div class="container">
        <h2>Create News</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label><h5>HeadLine:</h5></label>
            <input type="text" name="headline" placeholder="HeadLine" value={this.state.headline} onChange={this.handleChange}/><br></br>
          </div>
          <div className="form-group">
            <label><h5>URL:</h5></label>
            <input type="url" name="url" placeholder="" value={this.state.url} onChange={this.handleChange}/><br></br>
          </div>

          <div className="form-group">
            <label><h5>Description:</h5></label>
            <textarea type="text" name="content" placeholder="Content" className="longInput"  value={this.state.content} onChange={this.handleChange}/><br></br>
           
          </div>
          <div className="form-group">
          <label><h5>Select Category:</h5></label>
         <select id="lang" name="category" onChange={this.handleChange} value={this.state.category}>
          <option value="TopNews">TopNews</option>
          <option value="BusinessNews">BusinessNews</option>
          <option value="RoughCuts">RoughCuts</option>
           </select>
       
      </div>
          <div class="form-group">        
          <button type="submit" class="btn btn-default">Save</button>
          
          
          </div>
        </form>
        </div>
       
        </div>
      );
  }
}
export default App;
