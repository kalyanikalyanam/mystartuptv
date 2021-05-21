import React from "react";
import "./../../index.css";
import firebase from "./../../Config";
import AdminHeader from "./../Header";
import AdminFooter from "./../Footer";
import AdminSidebar from "./../Sidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import $ from "jquery";
import renderHTML from "react-render-html";
$.DataTable = require("datatables.net");
class MP3List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      MP3List: [],
      usePermList: "",
      count: 1,
      activePage: "1",
      countPage: "",
    };
  }
  componentDidMount() {
    var ref = firebase.database().ref("Mp3/");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          mp3Id: element.key.toString(),
          headline: element.val().headline,
          content: element.val().content,
          image: element.val().image,
          mp3: element.val().mp3,
          category: element.val().category,

          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState(
        { MP3List: data, countPage: data.length, loading: false },
        () => {
          console.log(this.state.MP3List, "MP3");
        }
      );
      this.interval = setTimeout(() => $(".paginationTable").DataTable(), 1000);
    });
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
        var playersRef = firebase.database().ref(`/Mp3/${id}`);
        playersRef.remove();
        this.componentDidMount();
      } else {
      }
      // window.location.reload("/Home");
    });
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
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <strong>Podcast List </strong>
                    </h4>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="add-category col-md-3 add_btn pull-right "
                      title="Add Podcast"
                    >
                      <Link to="/Admin/AddMP3">
                        Add Podcast{" "}
                        <i
                          className="fa fa-plus-square edit_clr"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <table
                  id="customers"
                  className="table table-bordered paginationTable"
                >
                  <thead>
                    <tr width="60%">
                      <th width="2%">S.no</th>
                      <th width="25%">Headline</th>
                      <th width="15%">Category</th>
                      <th width="10%">Created on</th>

                      <th width="8%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.MP3List &&
                      this.state.MP3List.map((category, index) => {
                        console.log(category);
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>
                              <p>{renderHTML(category.headline)}</p>
                            </td>
                            <td>
                              <p>{category.category}</p>
                            </td>
                            <td>
                              <p>{category.created_on}</p>
                            </td>

                            <td>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="col-md-6">
                                    <button
                                      className="form-control edit_btn"
                                      title="Edit MP3"
                                    >
                                      <Link
                                        to={`/Admin/EditMP3/${category.mp3Id}`}
                                      >
                                        <i
                                          class="fa fa-pencil-square-o edit_clr"
                                          aria-hidden="true"
                                        ></i>
                                      </Link>
                                    </button>
                                  </div>
                                  <div className="col-md-6">
                                    {/* <button className="form-control view_btn" title="View MP3"><Link to={`/PodcastHome/${category.mp3Id}`}>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                     </Link></button> */}

                                    <button
                                      data-toggle="tooltip"
                                      title="Delete"
                                      className=" form-control pd-setting-ed edit_btn del_bg"
                                      data-id={category.mp3Id}
                                      onClick={this.deleteItem.bind(
                                        this,
                                        category.mp3Id
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
export default MP3List;
