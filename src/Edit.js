import React from 'react';
import "./index.css";
import { Link } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import firebase from './Config';

class Edit extends React.Component{
  constructor(props){
    super(props);

    this.state={
         headline:'',
         content:'',
         date:  new Date().toLocaleString(),
         News:[],
         };
      }
componentDidMount(){
      var ref=firebase.database().ref('News');
    ref.once("value",snapshot =>{
     const data =[];
      console.log(snapshot.val());
      snapshot.forEach(element => {
        const usersData={
          editId: element.key.toString(),
          headline:element.val().headline,
          url:element.val().url,
          content:element.val().content,
          created_on:element.val().created_on
        }
        data.unshift(usersData);
      });
     
      this.setState({News:data},()=>{
        console.log(this.state.News,'News');
      });
    })
    }
    
    render(){

        return(
      <div>
         <div className="sidebar">
          <SideBar/>
       </div>
        <div className="header">
          <Header/>
          </div>
          <h2><b>Edit News Page</b></h2>  
        <table id="customers">
             <thead>
               <tr>
               <th>S.no</th>
               <th>HeadLine</th>
               <th>Created On</th>
               <th>Edit Button</th>
               </tr>
               </thead>
               <tbody>
       {this.state.News.length>0? this.state.News.map((items,index) => {
              console.log(items);
            return(
                  <tr key={index}>
                  <td>{index + 1}</td>
                  <td><p>{items.headline}</p></td>
                  <td><p>{items.created_on}</p></td>
                  <td><button><Link to={`/EditNews/${items.editId}`}>Edit</Link></button></td>
                  </tr>
                  );
                }):null}
              </tbody> 
        </table>
        
        
      </div>
        );
    }
}
export default Edit;

