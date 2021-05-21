import React from 'react';
import firebase from './Config';
import "./index.css";
import ViewCategoryPage1 from './ViewCategoryPage1';
//import Sample from './Sample';
//import Button from './Button';

class ViewNewsPage1 extends React.Component{

    constructor(props){
        super(props);
        this.state={
             headline:'',
             url:'',
             content:'',
             category:'',
             created_on:  new Date().toLocaleString(),
             loading:false,
             date:'',
             News:[],
             Categories:[],
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
      
    
     
     data.sort(function(a, b){
        if(a.category < b.category) { return -1; }
        if(a.category > b.category) { return 1; }
        return 0;
    })
    
 
    
    
    
      this.setState({Categories:data},()=>{
        console.log(this.state.Categories,'Categories');
        
      });
    })
    }

   
  
    render(){
        return(		
          <section className="homerecentportfolio grays fullwidth">
          <div className="container">
            
      <div className="categories">
            <div className="row">
      {this.state.Categories.length>0? this.state.Categories.map((category,index) => {
           return(
  
  
 <ViewCategoryPage1  category={category.category}/>
        

       );
     }):null}	
	</div>
    </div>
    </div>
    </section>
 );
    }
}
export default ViewNewsPage1;
   
