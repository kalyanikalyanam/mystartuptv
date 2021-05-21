import React from "react";
import "./../../index.css";
import firebase from "./../../Config";
import AdminHeader from "./../Header";
import AdminFooter from "./../Footer";
import AdminSidebar from "./../Sidebar";
import * as moment from "moment";
import $ from "jquery";
$.DataTable = require("datatables.net");
class BlogTodaysNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headline: "",
      content: "",
      category: "",
      image: "",
      created_on: new Date().toLocaleString(),
      date: "",
      Blog: [],
      status: true,
      usePermList: "",
      count: 1,
      activePage: "1",
      countPage: "",
    };
  }
  componentDidMount() {
    console.log(this.state.created_on);
    var ref = firebase.database().ref("Blog");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          blogeditorId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          image: element.val().image,
          category: element.val().category,
          created_on: element.val().created_on,
          status: element.val().status,
          date: element.val().date,
        };
        data.unshift(usersData);
      });

      this.setState(
        { Blog: data, countPage: data.length, loading: false },
        () => {
          console.log(this.state.Blog, "Blog");
        }
      );
      this.interval = setTimeout(() => $(".paginationTable").DataTable(), 1000);
    });
  }

  handleChange = (Id, status) => {
    const value = status === "Select" ? "Selected" : "Select";
    const data = this.state.Blog;
    for (var i in data) {
      if (this.state.Blog && data[i].blogeditorId == Id) {
        let reff = firebase.database().ref(`/Blog/${data[i].blogeditorId}`);

        reff.update({
          status: value,
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
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminHeader />
            <div className="user-dashboard">
              <AdminSidebar />
              <div className="col-md-10">
                {/* <h4><strong>Blog Editor's Pick</strong></h4> */}
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <strong>Blog Editor's Pick </strong>
                    </h4>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="add-category col-md-3 add_btn pull-right " title="Blog Editor's Pick">
 <Link to='/BlogHome'>Blog Editor's Pick</Link></div> */}
                    <h4>&nbsp;</h4>
                  </div>
                </div>

                <table
                  id="customers"
                  className="table table-bordered paginationTable"
                >
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>HeadLine</th>
                      <th>Created_on</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Editor's Pick</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Blog &&
                      this.state.Blog.map((items, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <p>{items.headline}</p>
                            </td>
                            <td>
                              <p>{items.created_on}</p>
                            </td>

                            <td>
                              <p>
                                {moment(items.date)
                                  .locale("en")
                                  .format("YYYY-MM-DD HH:mm")}
                              </p>
                            </td>
                            <td>
                              <p>{items.category}</p>
                            </td>

                            <td>
                              <button
                                onClick={() =>
                                  this.handleChange(
                                    items.blogeditorId,
                                    items.status
                                  )
                                }
                                className="edit_btn form-control"
                              >
                                {items.status == "Selected"
                                  ? "Selected"
                                  : "Select"}
                              </button>
                            </td>
                            {/* <td><button onClick={this.handleChange.bind(this,items.editorId)}>{items.status}</button></td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }
}

export default BlogTodaysNews;

// import React from 'react';
// import "../index.css";
// //import { Link } from 'react-router-dom';
// import AdminHeader from './Header';
// import AdminFooter from './Footer';
// import AdminSidebar from './Sidebar';
// import firebase from '../Config';
// import * as moment from 'moment';

// class TodaysNews extends React.Component{
//   constructor(props){
//     super(props);

//     this.state={
//          headline:'',
//          content:'',
//          category:'',
//          created_on:  new Date().toLocaleString(),
//          date:'',
//          News:[],
//          status:true,

//          };

//       }
// componentDidMount(){

//     console.log(this.state.created_on);
//       var ref=firebase.database().ref('News');
//     ref.once("value",snapshot =>{
//      const data =[];
//       console.log(snapshot.val());
//       snapshot.forEach(element => {
//         const usersData={
//           editorId: element.key.toString(),
//           headline:element.val().headline,
//           url:element.val().url,
//           content:element.val().content,
//           category:element.val().category,
//           created_on:element.val().created_on,
//           status:element.val().status,
//           date:element.val().date,
//         }
//         data.unshift(usersData);
//       });

//       this.setState({News:data},()=>{
//         console.log(this.state.News,'News');
//       });
//     })
//     }

//       handleChange = (Id) => {

//         console.log(this.state.News);
//         const data = this.state.News;
//           for (var i in data) {

//           if(this.state.News&&data[i].editorId == Id){
//             let reff= firebase.database().ref(`/News/${data[i].editorId}`);

//               reff.update({

//                       status:"Selected",
//                   });

//           }
//           else{
//             let reff= firebase.database().ref(`/News/${data[i].editorId}`);
//             reff.update({

//               status:"select",
//           });

//           }
//         }

// this.componentDidMount();

//       }

//     render(){
//      return(
//      <div>
// <div className="container-fluid">
// <div className="row">
//     <AdminHeader/>
//        <div className="user-dashboard">
//             <AdminSidebar/>
//             <div className="col-md-10">
//             <h4><strong>Editor's Pick</strong></h4>
//             <table id="customers">
//              <thead>
//                <tr>
//                <th>S.no</th>
//                <th>HeadLine</th>
//                <th>Created_on</th>
//                <th>Date</th>
//                <th>Category</th>
//                <th>Editor's Pick</th>
//                </tr>
//                </thead>
//                <tbody>
//        {this.state.News && this.state.News.map((items,index) => {
//             return(
//                   <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td><p>{items.headline}</p></td>
//                   <td><p>{items.created_on}</p></td>
//                   <td><p>{moment(items.date).locale("en").format("YYYY-MM-DD HH:mm")}</p></td>
//                   <td><p>{items.category}</p></td>

//   {/* <td><button onClick={this.handleChange.bind(this,items.editorId)} className="edit_btn form-control">
//     {items.status=='Selected' ? 'Selected' : 'Select'}
//             </button></td> */}
//             <td><button onClick={this.handleChange.bind(this,items.editorId)}>{items.status}</button></td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//         </table>
//          </div>
//          </div>
// </div>
// </div>
// <AdminFooter/>
// </div>
//         );
//     }
// }

// export default TodaysNews;
