

import React from 'react';
import "../index.css";
import firebase from './../Config';
import { Link } from 'react-router-dom';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
import swal from 'sweetalert';
import $ from 'jquery';
$.DataTable = require('datatables.net');

class CategoryListPage extends React.Component{
  constructor(props){
    super(props);
    this.datatable = null;
    this.state={
         headline:'',
         content:'',
         category:'',
         created_on:  new Date().toLocaleString(),
         date:'',
         Categories:[],
         usePermList: "",
            count: 1,
            activePage: "1",
            countPage: "",
         };
      }
componentDidMount(){
      var ref=firebase.database().ref('Categories/');
    ref.once("value",snapshot =>{
     const data =[];
      console.log(snapshot.val());
      snapshot.forEach(element => {
        const usersData={
          categoryId: element.key.toString(),
          
          category:element.val().category,
          created_on:element.val().created_on,
          date:element.val().date,
        }
        data.unshift(usersData);
      });
     
      this.setState({Categories:data, countPage: data.length,loading: false},()=>{
        console.log(this.state.Categories,'Categories');
      });

      this.interval = setTimeout(() => $('.paginationTable').DataTable(), 1000);
    })
    }

    componentWillUnmount() {
        
      clearTimeout(this.interval);
  }
    deleteItem = (id) => {
      swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
        if (willDelete) {
          console.log(id);
          var playersRef = firebase.database().ref(`/Categories/${id}`);
          playersRef.remove();
          this.componentDidMount();
    
        } else {}
        // window.location.reload("/Home");
       
    });
    
      };
    
    render(){
      var pathname = this
      .props
      .location
      .pathname
      .split("/");
        return(
     
              

<div>          
<div className="container-fluid">
<div className="row">
    <AdminHeader/>
       <div className="user-dashboard">
            <AdminSidebar/> 
            <div className="col-md-10">                 
              <div className="row">
                  <div className="col-md-6"><h4><strong>Category List </strong></h4></div>    
                  <div className="col-md-6">  
                                  
 <div className="add-category col-md-3 add_btn pull-right " title="Add Category">
 <Link to='/Admin/AddCategory'>Add Category <i className="fa fa-plus-square edit_clr" aria-hidden="true"></i></Link></div>
        
                  </div>            
              </div>            
                       
            <table id="customers" className="table table-bordered paginationTable">
             <thead>
               <tr width="100%">
               <th width="1%">S.no</th>
               <th width="33%">Category</th>
               <th width="33%">Created_on</th>
               <th width="14%">Action</th>
              
               </tr>
               </thead>
               <tbody>
       {this.state.Categories.length>0? this.state.Categories.map((category,index) => {
              console.log(category);
            return(
                  <tr key={index}>
                  <td>{index + 1}</td>
               
                  <td><p>{category.category}</p></td>
                  <td><p>{category.created_on}</p></td>
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                    <div className="col-md-6"> 
                    
                    <button className="form-control edit_btn" title="Edit Category"><Link to={`/Admin/EditCategory/${category.categoryId}`}>
                    <i class="fa fa-pencil-square-o edit_clr" aria-hidden="true"></i></Link></button>
                    </div>
                    <div className="col-md-6">    
                    <button data-toggle="tooltip" title="Delete Category" className=" form-control pd-setting-ed edit_btn del_bg"  data-id={category.categoryId}  onClick={this.deleteItem.bind(this, category.categoryId)}>
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
export default CategoryListPage;