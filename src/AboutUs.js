import React from 'react';
//import firebase from './Config';
import { Link } from 'react-router-dom';
import "./index.css";
import Header from './Header';
import Footer from './Footer';


class ContactUs extends React.Component{
  constructor(props){
    super(props);
        this.state={
         name:'',
         phoneno:'',
         email:'',
         address:'',
         message:'',
         created_on: new Date().toLocaleString(),
         ContactDetails:[],
        
        };
    }

  render(){
    
      return(
        
<div>
    <Header/>

    <section className="colorarea">
        <div className="bgsizecover headeropacity" style={{backgroundImage:"url(img/headers/1.jpg);"}}>
        </div>
        </section>
        <div className="container" >
            <div className="row"  >
                <div className="col-md-12 negmtop" >
                    <h1 className="pgheadertitle animated fadeInLeft pull-left " >About Us</h1>
                </div>
            </div>
        </div>
      
            <div className="container" >
                <div className="shortcode row">
                    <div className="col-md-6" >
                            <div className="titleborder left">
                                <div>
                                    <h1>Welcome to Asher</h1>
                                </div>
                            </div>
                             Use a few of the new styles together, and you’ve got easy pull quotes or a great introductory article image. Or spinning icons for loading and refreshing content. Or fun big icons in multi-line buttons. You can combine all of them in any combination to get lots of new possibilities. Use a few of the new styles together, and you’ve got easy pull quotes or a great introductory article image. Or spinning icons for loading. Bootstrap is a platform you can use to create a beautiful website or blog. Bootstrap is both free and priceless at the same time.<br/>
                        </div>
                       
                        <div className="col-md-6" style={{paddingLeft:"80px"}} >
                            <div className="titleborder left">
                                <div>
                                    <h1>Why Choose Us</h1>
                                </div>
                            </div>
                            <div className="unstyle">
                                <ul className="circleoklist">
                                    <li>Nesciunt tofu stumptown aliqua</li>
                                    <li>Retro synth master</li>
                                    <li>Mustache cliche tempor</li>
                                    <li>Williamsburg carles vegan</li>
                                    <li>Reprehenderit butcher retro</li>
                                    <li>Butcher retro keffiyeh</li>
                                </ul>
                            </div>
                        </div>
                       
                    </div>
                    
                    
                    
                    <div className="shortcode row">
                        <div className="col-md-12">
                            <div className="titleborder center">
                                <div>
                                    <h1>Team</h1>
                                </div>
                            </div>
                       
                        <div className="col-md-4">
                            <div className="thumbnail">
                                <img src="http://www.wowthemes.net/demo/biscaya/img/demo/team1.jpg" alt=""/>
                                <div className="caption">
                                    <h4>Emma M. Coffey</h4>
                                    <span className="fontitalic">Manager at WowThemes</span>
                                    <p>Praesent id metus ante, ut condimentum magna. Nam bibendum, felis eget.<br></br>
                                    </p>
                                    
                                    <ul className="social-icons">
                                        <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-pinterest"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="thumbnail">
                                <img src="http://www.wowthemes.net/demo/biscaya/img/demo/team2.jpg" alt=""/>
                                <div className="caption">
                                    <h4>Gloria G. Andersen</h4>
                                    <span className="fontitalic">Owner of BreCafe</span>
                                    <p>
                                         Praesent id metus ante, ut condimentum magna. Nam bibendum, felis eget.<br></br>
                                    </p>
                                    <ul className="social-icons">
                                        <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-pinterest"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="thumbnail">
                                <img src="http://www.wowthemes.net/demo/biscaya/img/demo/team3.jpg" alt=""/>
                                <div className="caption">
                                    <h4>Lorie W. Bush</h4>
                                    <span className="fontitalic">Public Relations</span>
                                    <p>
                                         Praesent id metus ante, ut condimentum magna. Nam bibendum, felis eget.<br></br>
                                    </p>
                                    <ul className="social-icons">
                                        <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-pinterest"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
      </div>
                    </div>
                    
                </div>
                

      </div>
    <Footer/>

</div>
     
 
  
      );
  }
}
export default ContactUs;