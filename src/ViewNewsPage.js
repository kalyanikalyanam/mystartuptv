import React from "react";
import { Link } from "react-router-dom";
import firebase from "./Config";
import ReactPlayer from "react-player";
import "./index.css";
import ItemsCarousel from "react-items-carousel";
import ViewCategoryPage from "./ViewCategoryPage";
import Sample from "./Sample";
//import Button from './Button';

class ViewNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      url: "",
      content: "",
      category: "",
      created_on: new Date().toLocaleString(),
      loading: false,
      date: "",
      News: [],
      Categories: [],
    };
  }
  componentDidMount() {
    var ref = firebase.database().ref("Categories/");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          categoryId: element.key.toString(),

          category: element.val().category,
          created_on: element.val().created_on,
          date: element.val().date,
        };
        data.unshift(usersData);
      });

      this.setState({ Categories: data }, () => {
        console.log(this.state.Categories, "Categories");
      });
    });
  }

  render() {
    return (
      <div>
        <section className="homerecentportfolio grays fullwidth">
          {this.state.Categories.length > 0
            ? this.state.Categories.map((category, index) => {
                return (
                  <div className="container">
                    <h1 className="heading">
                      <Link
                        to={`TopStartupNewsPage/${category.category}`}
                        style={{ color: "black", textTransform: "uppercase" }}
                      >
                        {category.category}>>
                      </Link>
                    </h1>
                    <ViewCategoryPage category={category.category} />
                  </div>
                );
              })
            : null}
        </section>
      </div>
    );
  }
}
export default ViewNewsPage;
