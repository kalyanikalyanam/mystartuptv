import React from 'react';
//import { Link } from 'react-router-dom';
import firebase from './Config';

class EditNews extends React.Component{
  constructor(props){
    super(props);
    this.state={
         headline:'',
         content:'',
         url:'',
         
         created_on:  new Date().toLocaleString(),
         News:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    componentDidMount() {
      const {editId} = this.props.match.params;
    
    console.log(editId);
    var ref=firebase.database().ref(`News/${editId}`);
      ref.on('value', snapshot => {
          var data = snapshot.val();
          //console.log(data)
          this.setState({
              headline: data.headline,
              content:data.content,
              url:data.url,
              created_on:data.created_on,

          });
         
          //console.log(this.state.News);
      });
    }
    handleChange=(event)=>{
        console.log(event.target.value);
        this.setState({
         [ event.target.name]: event.target.value,
        });
      };
  
  handleSubmit=(event)=>{
   
        const {editId} = this.props.match.params;
        
            event.preventDefault();
            
            let reff= firebase.database().ref(`/News/${editId}`);
            console.log(reff);
        reff.update({
                content: this.state.content,
                headline: this.state.headline,
                url: this.state.url,
                created_on: this.state.created_on,
            });

            this.setState({headline: this.state.content, 
            url: this.state.url,
            content: this.state.content});
            this.props.history.push("/ViewNewspage");
        }


    render(){
        return(
            <div>
            <div class="container">
            <h2>Edit News</h2>
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label><h5>HeadLine:</h5></label>
                <input type="text" name="headline" placeholder="HeadLine" value={this.state.headline} onChange={this.handleChange}/><br></br>
              </div>
              <div class="form-group">
                <label><h5>URL:</h5></label>
                <input type="url" name="url" placeholder="" value={this.state.url} onChange={this.handleChange}/><br></br>
              </div>
    
              <div class="form-group">
                <label><h5>Description:</h5></label>
                <textarea type="text" name="content" placeholder="Content" className="longInput"  value={this.state.content} onChange={this.handleChange}/><br></br>
               
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
export default EditNews;

