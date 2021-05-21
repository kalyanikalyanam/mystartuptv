import React from "react";
import { Link } from "react-router-dom";
import "./../../index.css";
import firebase from "./../../Config";
import AdminHeader from "./../Header";
import AdminFooter from "./../Footer";
import AdminSidebar from "./../Sidebar";
import swal from "sweetalert";
import $ from "jquery";
$.DataTable = require("datatables.net");
class ContributeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phoneno: "",
      email: "",
      status: true,
      select: "",
      created_on: new Date().toLocaleString(),
      ContributeList: [],
      usePermList: "",
      count: 1,
      activePage: "1",
      countPage: "",
    };
  }
  componentDidMount() {
    var ref = firebase.database().ref("ContributeList/");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          contributeId: element.key.toString(),
          name: element.val().name,
          phoneno: element.val().phoneno,
          email: element.val().email,
          select: element.val().select,
          status: element.val().status,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState(
        { ContributeList: data, countPage: data.length, loading: false },
        () => {
          console.log(this.state.ContributeList, "ContributeList");
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
        var playersRef = firebase.database().ref(`/ContributeList/${id}`);
        playersRef.remove();
        this.componentDidMount();
      } else {
      }
      // window.location.reload("/Home");
    });
  };
  handleChange = (Id, status) => {
    const value = status === "Unread" ? "Read" : "Unread";
    const data = this.state.ContributeList;
    for (var i in data) {
      if (this.state.ContributeList && data[i].contributeId == Id) {
        let reff = firebase
          .database()
          .ref(`/ContributeList/${data[i].contributeId}`);

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
    //     const listItems = this.state.select&&this.state.select.map((number) =>
    //     <li>{number}</li>

    //   );

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
                      <strong>Contribute List </strong>
                    </h4>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="add-category col-md-3 add_btn pull-right " title="Contribute">
 <Link to='/contribute'>Contribute</Link></div> */}
                    <h4>&nbsp;</h4>
                  </div>
                </div>

                <table
                  id="customers"
                  className="table table-bordered paginationTable"
                >
                  <thead>
                    <tr width="100%">
                      <th width="1%">S.no</th>
                      <th width="12%">Name</th>
                      <th width="10%">Contact Number</th>
                      <th width="10%">Email</th>
                      {/* <th width="12%">Selected Items</th> */}

                      <th width="12%">Date</th>
                      <th width="5%">Status</th>
                      <th width="6%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.ContributeList.length > 0
                      ? this.state.ContributeList.map((category, index) => {
                          console.log(category);
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td>
                                <p>{category.name}</p>
                              </td>
                              <td>
                                <p>{category.phoneno}</p>
                              </td>
                              <td>
                                <p>{category.email}</p>
                              </td>
                              {/* <td><p>{category.listItems}</p></td> */}

                              <td>
                                <p>{category.created_on}</p>
                              </td>

                              <td>
                                <button
                                  onClick={() =>
                                    this.handleChange(
                                      category.contributeId,
                                      category.status
                                    )
                                  }
                                  className="edit_btn form-control"
                                >
                                  {category.status == "Read"
                                    ? "Read"
                                    : "Unread"}
                                </button>
                              </td>
                              <td>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="col-md-6">
                                      <button
                                        className="form-control view_btn_contribute"
                                        title="View contribute"
                                      >
                                        <Link
                                          to={`/Admin/ViewContribute/${category.contributeId}`}
                                        >
                                          <i
                                            class="fa fa-eye edit_clr"
                                            aria-hidden="true"
                                          ></i>
                                        </Link>
                                      </button>
                                    </div>
                                    <div className="col-md-6">
                                      <button
                                        data-toggle="tooltip"
                                        title="Delete"
                                        className=" form-control pd-setting-ed edit_btn del_bg"
                                        data-id={category.contributeId}
                                        onClick={this.deleteItem.bind(
                                          this,
                                          category.contributeId
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
export default ContributeList;
