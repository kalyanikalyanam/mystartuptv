import React from 'react';
import "../index.css";
import firebase from './../Config';
import {Link} from "react-router-dom";

import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import swal from 'sweetalert';
import $ from 'jquery';
$.DataTable = require('datatables.net');
class WorkWithUsList extends React.Component{
  constructor(props){
    super(props);

    this.state={
        name:'',
         phoneno:'',
         email:'',
         status:true,
         select:'',
         created_on: new Date().toLocaleString(),
         WorkWithUsList:[],
         usePermList: "",
         count: 1,
         activePage: "1",
         countPage: "",
         };
      }
componentDidMount(){
      var ref=firebase.database().ref('WorkWithUsList/');
    ref.once("value",snapshot =>{
     const data =[];
      console.log(snapshot.val());
      snapshot.forEach(element => {
        const usersData={
          workwithusreadId: element.key.toString(),
          name:element.val().name,
          phoneno:element.val().phoneno,
          email:element.val().email,
          cv:element.val().cv,
          selectcategory:element.val().selectcategory,
          status:element.val().status,
          created_on:element.val().created_on,
          
        }
        data.unshift(usersData);
      });
     
      this.setState({WorkWithUsList :data, countPage: data.length,loading: false},()=>{
        console.log(this.state.WorkWithUsList,'WorkWithUsList');
      });
      this.interval = setTimeout(() => $('.paginationTable').DataTable(), 1000);
    })
    }
    deleteItem = (id) => {
      swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
        if (willDelete) {
          console.log(id);
          var playersRef = firebase.database().ref(`/WorkWithUsList/${id}`);
          playersRef.remove();
          this.componentDidMount();
    
        } else {}
        // window.location.reload("/Home");
       
    });
    
      };

      handleChange = (Id,status) => {
        const value = status === 'Unread' ? 'Read' : 'Unread';
        const data = this.state.WorkWithUsList;
          for (var i in data) {

          if(this.state.WorkWithUsList&&data[i].workwithusreadId == Id){
            let reff= firebase.database().ref(`/WorkWithUsList/${data[i].workwithusreadId}`);
                 
              reff.update({
                      
                      status:value,
                  });

          }
          // else{
          //   let reff= firebase.database().ref(`/News/${data[i].editorId}`);
          //   reff.update({
                      
          //     status:"select",
          // });

          // }
        }

this.componentDidMount();
  
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
              <div className="row">
                  <div className="col-md-6"><h4><strong>Work With Us List </strong></h4></div>    
                  <div className="col-md-6">  
                                  
 {/* <div className="add-category col-md-3 add_btn pull-right " title="Work With Us">
 <Link to='/workwithus'>Work With Us </Link></div> */}

<h4>&nbsp;</h4>
        
                  </div>            
              </div>            
                       
            <table id="customers" className="table table-bordered paginationTable">
             <thead>
               <tr width="100%">
               <th width="1%">S.no</th>
               <th width="12%">Name</th>
               <th width="12%">Contact Number</th>
               <th width="12%">Email</th>
               <th width="12%">Selected Category</th>
               <th width="12%">CV</th>
               <th width="10%">Date</th>
               <th width="10%">Status</th>
               <th width="6%">Action</th>
              
               </tr>
               </thead>
               <tbody>
       {this.state.WorkWithUsList.length>0? this.state.WorkWithUsList.map((category,index) => {
              console.log(category);
            return(
                  <tr key={index}>
                  <td>{index + 1}</td>
               
                  <td><p>{category.name}</p></td>
                  <td><p>{category.phoneno}</p></td>
                  <td><p>{category.email}</p></td>
                  <td><p>{category.selectcategory}</p></td>
                  <td><p><a href={category.cv}><i className="fa fa-file-text" aria-hidden="true">CV</i></a></p></td>
                  <td><p>{category.created_on}</p></td>
                  <td><button onClick={()=>this.handleChange(category.workwithusreadId,category.status)} className="edit_btn form-control">
    {category.status=='Read' ? 'Read' : 'Unread'}
            </button></td>
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                   <div className="col-md-6"> 
                    
                    {/* <button className="form-control edit_btn" title="Edit Category"><Link to={`/{this.state.cv}/${category.contactId}`}>
                    <i class="fa fa-pencil-square-o edit_clr" aria-hidden="true"></i></Link></button> */}
            </div>
                    <button data-toggle="tooltip" title="Delete" className=" form-control pd-setting-ed edit_btn del_bg_work"  data-id={category.workwithusId}  onClick={this.deleteItem.bind(this, category.workwithusId)}>
                      <i className="fa fa-trash-o edit_clr" aria-hidden="true"></i></button>
                 
                    </div>
                     </div>                   
                    </td>                       
                  </tr>
                  );
                }):null}
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
export default WorkWithUsList;