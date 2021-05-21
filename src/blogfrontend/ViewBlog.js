import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import renderHTML from "react-render-html";

import "./../index.css";
//import ItemsCarousel from 'react-items-carousel';
//import * as moment from 'moment';

class ViewBlog1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      date: "",
      image: "",
      created_on: new Date().toLocaleString(),

      Blog: [],

      activeItemIndex: "",
    };
  }
  componentDidMount() {
    var ref = firebase
      .database()
      .ref("Blog")
      .orderByChild("category")
      .equalTo(this.props.category);
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          blogId: element.key.toString(),
          headline: element.val().headline,
          image: element.val().image,
          content: element.val().content,
          category: element.val().category,
          schedule_date_number: element.val().schedule_date_number,
          created_on: element.val().created_on,
          date: element.val().date,
        };
        data.unshift(usersData);
      });
      const schedule1 = Date.now();
      var sortedKeys = data.filter((res) => {
        // console.log(res);

        return res.schedule_date_number <= schedule1;
      });

      // this.setState({ productList: sortedKeys, loading: true });
      this.setState({ Blog: sortedKeys }, () => {
        console.log(this.state.Blog, "Blog");
      });
    });
  }

  render() {
    return (
      this.state.Blog &&
      this.state.Blog.map((Blog, index) => {
        if (index == 0)
          return (
            <div className="col-md-4 mb-10" key={index}>
              <div className="artical-box">
                <div className="artical-box-head">
                  <h1>{Blog.category}</h1>
                </div>

                <div className="artical-box-image">
                  <img src={Blog.image} width="400px" height="400px"></img>
                </div>

                <div className="artical-box-subhead">
                  <h1>
                    <a href={Blog.url} target="_blank">
                      {renderHTML(Blog.headline)}
                    </a>
                  </h1>
                </div>
                <div className="artical-box-content">
                  {renderHTML(Blog.content)}
                </div>

                <div className="artical-box-see-more">
                  <span>
                    <Link to={`BlogSeperatePage/${Blog.category}`}>
                      SEE MORE{" "}
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          );
      })
    );
  }
}
export default ViewBlog1;
