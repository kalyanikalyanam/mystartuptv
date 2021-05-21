import React from 'react';
import {Link} from 'react-router-dom'; 
import swal from 'sweetalert';
import firebase from './../Config';

class AdminHeader extends React.Component{

    logout = () => {
        swal({
            title: "Are you sure?",
            text: "Do your really want to log out your account?",
            icon: "warning",
            buttons: true,
            dangerMode: true
          }).then(willDelete => {
            if (willDelete) {
                firebase.auth().signOut().then(function() {
                    console.log("Logged out!");
                    sessionStorage.clear();	
                 }, function(error) {
                    console.log(error.code);
                 });
              sessionStorage.clear();
              window.location.href = '/Login';
            //   this.props.history.push('/');
            } else {
            }
          });
    
       
      };
render(){
    return(
    <div className="fixedmenu fixed_full">    
            <div className="col-md-9">
                 <Link to="/"><img src="/img/mystartuptvlogo (1).png" alt="logo" className="hidden-xs hidden-sm" style={{height:"50px"}} />
                    {/*<img src="/img/logo.png" alt="logo" className="visible-xs visible-sm circle-logo" />*/}
   
                </Link>
            </div>
            <div className="col-md-3">            
            <div className="header-rightside">
                    <ul className="list-inline header-top pull-right">
                        
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1pjBslQKPUDyiu_AitG6bTEwoS0c3Ko_eZMo5BWFbe4w8Rx__Gg" alt="user"/>
                                <b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="navbar-content">
                                    <p className="text-muted small">
                                           {sessionStorage.getItem("email")}
                                        </p>
                                       
                                        
                                        <li> <Link to="/Admin/ChangePassword"><span className="icon nalika-user author-log-ic"></span>Change Password</Link>
                                                        </li>    
                                                        <li> <Link to="/Admin/ChangeEmail"><span className="icon nalika-user author-log-ic"></span>Change Email</Link>
                                                        </li>                                              
                                                       
                                      <li>  <Link to="#" onClick={this.logout} className="view btn-sm active">Logout</Link></li>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>            
            </div>
            </div>
     
     
        );
}


}
export default AdminHeader;