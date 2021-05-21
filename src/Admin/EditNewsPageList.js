import React from 'react';
import "../index.css";
import firebase from './../Config';
import { Link } from 'react-router-dom';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import swal from 'sweetalert';
import * as moment from 'moment';
import $ from 'jquery';
$.DataTable = require('datatables.net');

class EditNewsPageList extends React.Component{
  constructor(props){
    super(props);
    this.datatable = null;
    this.state={
         headline:'',
         content:'',
         category:'',
         created_on:  new Date().toLocaleString(),
         date:'',
         News:[],
         usePermList: "",
            count: 1,
            activePage: "1",
            countPage: "",
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
          category:element.val().category,
          created_on:element.val().created_on,
          date:element.val().date,
        }
        data.unshift(usersData);
      });
     
      this.setState({News:data,countPage: data.length,loading: false},()=>{
        console.log(this.state.News,'News');
      });
      this.interval = setTimeout(() => $('.paginationTable').DataTable(), 1000);
    })
    }
    deleteItem = id => {
    
      swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
        if (willDelete) {
          console.log(id);
          var playersRef = firebase.database().ref(`/News/${id}`);
          playersRef.remove();
         this.componentDidMount();
          } else {}
       })
    
      };
    
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
                  <div className="col-md-6"><h4><strong>News List </strong></h4></div>    
                  <div className="col-md-6">  
                                  
 <div className="add-category col-md-3 add_btn pull-right " title="Add News">
 <Link to='/Admin/createNewsPage'>Add News <i className="fa fa-plus-square edit_clr" aria-hidden="true"></i></Link></div>
        
                  </div>            
              </div>  
            <table id="customers" className="table table-bordered paginationTable">
             <thead>
               <tr width="100%">
               <th width="1%">S.no</th>
               <th width="31%">HeadLine</th>
               <th width="22%">Category</th>
               <th width="14%">Created On</th>
               <th width="14%">Date</th>
               <th width="14%">Action</th>
               </tr>
               </thead>
               <tbody>
       {this.state.News.length>0? this.state.News.map((items,index) => {
              console.log(items);
            return(
                  <tr key={index}>
                  <td>{index + 1}</td>
                  <td><p>{items.headline}</p></td>
                  <td><p>{items.category}</p></td>
                  <td><p>{items.created_on}</p></td>
                  <td><p>{moment(items.date).locale("en").format("YYYY-MM-DD HH:mm")}</p></td>
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                    <div className="col-md-6">  
                    <button className="form-control edit_btn" title="Edit"><Link to={`/Admin/EditNewsPage/${items.editId}`}>
                    <i class="fa fa-pencil-square-o edit_clr" aria-hidden="true"></i></Link></button>
                    </div>
                    <div className="col-md-6">    
                    <button data-toggle="tooltip" title="Delete" className=" form-control pd-setting-ed edit_btn del_bg"  data-id={items.editId}  onClick={this.deleteItem.bind(this, items.editId)}>
                      <i className="fa fa-trash-o edit_clr" aria-hidden="true"></i></button>
                    </div>
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
export default EditNewsPageList;