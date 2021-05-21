import React from 'react';
import {Link} from 'react-router-dom'; 
class AdminFooter extends React.Component{
render(){
    return(
        
     <div>
		<div className="footerbottom">		
<div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
            <div className="col-md-4">
						<p id="back-top">
							<Link to="#top"><span><i className="fa fa-chevron-up"></i></span></Link>
						</p>
						 &copy; 2019 My Startup Tv. All Rights Reserved.
					</div>

					<div className="col-md-8 smallspacetop">
						<div className="pull-right smaller">
							<ul id="menu-footer" className="footermenu">
								{/*<li><Link to="#">Panelist</Link></li>
								<li><Link to="#">About Us</Link></li>
								<li><Link to="#">Contact us</Link></li>
								<li><Link to="#">Behind the Scene</Link></li>*/}
							</ul>
						</div>
						<div className="clearfix">
						</div>
					</div>
            </div>
            </div>
            </div>
			</div>

{/* 
		<footer id="colophon" className="site-footer " role="contentinfo">
		<div className="footerbottom">
			<div className="container">
				<div className="row">
					
				<div className="col-md-12">
					<div className="col-md-4">
						<p id="back-top">
							<Link to="#top"><span><i className="fa fa-chevron-up"></i></span></Link>
						</p>
						 &copy; 2019 My Startup Tv. All Rights Reserved.
					</div>
					
					<div className="col-md-8 smallspacetop">
						<div className="pull-right smaller">
							<ul id="menu-footer" className="footermenu">
								<li><Link to="#">Panelist</Link></li>
								<li><Link to="#">About Us</Link></li>
								<li><Link to="#">Contact us</Link></li>
								<li><Link to="#">Behind the Scene</Link></li>
							</ul>
						</div>
						<div className="clearfix">
						</div>
					</div>
					
					</div>				</div>
			</div>
		</div>
		</footer>
*/}

     </div>
     
     
        );
}


}
export default AdminFooter;