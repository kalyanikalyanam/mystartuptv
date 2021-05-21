import React from "react";
import "../index.css";
import firebase from "./../Config";
import { Link } from "react-router-dom";
import AdminHeader from "./Header";
import AdminFooter from "./Footer";
import AdminSidebar from "./Sidebar";
import swal from "sweetalert";
import $ from "jquery";
$.DataTable = require("datatables.net");

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.datatable = null;
    this.state = {
      Comments: [],
      usePermList: "",
      count: 1,
      activePage: "1",
      countPage: "",
    };
  }
  componentDidMount() {
    var ref = firebase
      .database()
      .ref("comments")
      .ref.once("value", (snapshot) => {
        const data = [];
        console.log(snapshot.val());
        snapshot.forEach((element) => {
          const usersData = {
            commentsId: element.key.toString(),
            name: element.val().name,
            message: element.val().message,
            text: element.val().text,
            created_on: element.val().created_on,
          };
          data.unshift(usersData);
        });

        this.setState(
          { Comments: data, countPage: data.length, loading: false },
          () => {
            console.log(this.state.Comments, "Comments");
          }
        );

        this.interval = setTimeout(
          () => $(".paginationTable").DataTable(),
          1000
        );
      });
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }
  deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        var playersRef = firebase.database().ref(`/comments/${id}`);
        playersRef.remove();
        this.componentDidMount();
      } else {
      }
      // window.location.reload("/Home");
    });
  };

  render() {
    var pathname = this.props.location.pathname.split("/");
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminHeader />
            <div className="user-dashboard">
              <AdminSidebar />
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <strong>Comments List </strong>
                    </h4>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="add-category col-md-3 add_btn pull-right "
                      title="Add Category"
                    >
                      <Link to="#">
                        <i className="fa fa-plus-square "></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <table
                  id="customers"
                  className="table table-bordered paginationTable"
                >
                  <thead>
                    <tr width="100%">
                      <th width="1%">S.no</th>
                      <th width="18%">Name</th>
                      <th width="33%">Comments</th>
                      <th width="15%">Reaction</th>
                      <th width="14%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Comments.length > 0
                      ? this.state.Comments.map((Comment, index) => {
                          console.log(Comment);
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td>
                                <p>{Comment.name}</p>
                              </td>
                              <td>
                                <p>{Comment.message}</p>
                              </td>
                              <td>
                                <p>{Comment.text}</p>
                              </td>
                              <td>
                                <div className="row">
                                  <div className="col-md-12">
                                    {/* <div className="col-md-6">
                                      <button
                                        className="form-control edit_btn"
                                        title="Edit Category"
                                      >
                                        <Link
                                          to={`/Admin/EditCategory/${Comment.categoryId}`}
                                        >
                                          <i
                                            class="fa fa-pencil-square-o edit_clr"
                                            aria-hidden="true"
                                          ></i>
                                        </Link>
                                      </button>
                                    </div> */}
                                    <div className="col-md-6">
                                      <button
                                        data-toggle="tooltip"
                                        title="Delete Category"
                                        className=" form-control pd-setting-ed edit_btn del_bg"
                                        data-id={Comment.commentsId}
                                        onClick={this.deleteItem.bind(
                                          this,
                                          Comment.commentsId
                                        )}
                                      >
                                        <i
                                          className="fa fa-trash-o edit_clr"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
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
export default Comments;
