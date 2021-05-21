import React from 'react';
import "../index.css";
//import { Link } from 'react-router-dom';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import firebase from '../Config';


class ViewCountList extends React.Component{
  constructor(props){
    super(props);

    this.state={
        ipAddress:'',
        newsId:'',
        ipCount:'',
         created_on:  new Date().toLocaleString(),
        
      
         };
        
         
        
      }
componentDidMount(){
   
    console.log(this.state.created_on);
      var ref=firebase.database().ref('Views');
    ref.once("value",snapshot =>{
     const data =[];
      console.log(snapshot.val());
      snapshot.forEach(element => {
        const usersData={
          viewId: element.key.toString(),
          ipAddress:element.val().ipAddress,
          newsId:element.val().newsId,
          ipCount:element.val().ipCount,
          
        }
        data.unshift(usersData);
      });
     
      this.setState({Views:data},()=>{
        console.log(this.state.Views,'Views');
      });
    })
    }
    render(){
     return(
     <div>          
<div className="container-fluid">
<div className="row">
    <AdminHeader/>
       <div className="user-dashboard">
            <AdminSidebar/> 
            <div className="col-md-10">                 
            <h4><strong>View Count Page</strong></h4>
            <table id="customers">
             <thead>
               <tr>
               <th>S.no</th>
               <th>IPAddress</th>
               <th>News ID</th>
               <th>View Count</th>
             
               </tr>
               </thead>
               <tbody>
       {this.state.Views && this.state.Views.map((items,index) => {
            return(
                  <tr key={index}>
                  <td>{index + 1}</td>
                  <td><p>{items.ipAddress}</p></td>
                  <td><p>{items.newsId}</p></td>
                  <td><p>{items.ipCount}</p></td>
                    </tr>
                  );
                })}
              </tbody> 
        </table>  
         </div>
         </div>
</div>
</div>
<AdminFooter/>
</div>
        );
    }
}


export default ViewCountList;