import React from 'react';
import "../index.css";
import './Dashboard.css';
import { Link } from 'react-router-dom';
import firebase from './../Config';
import AdminHeader from './Header';
import AdminFooter from './Footer';
import AdminSidebar from './Sidebar';
class Dashboard extends React.Component{
  constructor(props){
    super(props);
        this.state={
         headline:'',
         content:'',
         url:'',
         category:'TOPSTARTUPNEWS',
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
    
      this.props.history.push("/View");
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
              
        <div className="container-fluid">
        <div className="row">
            <AdminHeader/>
               <div className="user-dashboard">
                    <AdminSidebar/> 
                    <div className="col-md-10">                 
                    <h4><strong>Dashboard</strong></h4>
                        <div className="col-md-6 col-sm-9 col-xs-12 gutter">
                            <div className="sales">
                                <h2>Your Sale</h2>
                                <div className="btn-group">
                                    <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span>Period:</span> Last Year
                                    </button>
                                    <div className="dropdown-menu">
                                        <a href="#">2012</a>
                                        <a href="#">2014</a>
                                        <a href="#">2015</a>
                                        <a href="#">2016</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-9 col-xs-12 gutter">

                            <div className="sales report">
                                <h2>Report</h2>
                                <div className="btn-group">
                                    <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span>Period:</span> Last Year
                                    </button>
                                    <div className="dropdown-menu">
                                        <a href="#">2012</a>
                                        <a href="#">2014</a>
                                        <a href="#">2015</a>
                                        <a href="#">2016</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>
                 </div>
        </div>
    </div>
    <AdminFooter/>
    </div>



  
      );
  }
}
export default Dashboard;