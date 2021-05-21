import React from "react";
import { Link } from "react-router-dom";
import firebase from "./../Config";
import "./../index.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import ViewMp3 from "./../podcastfrontend/ViewMp3";
import renderHTML from "react-render-html";
class ViewMP3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      image: "",
      category: "",
      created_on: new Date().toLocaleString(),
      Categories: [],
      MP3List: [],
      autoplay: false,
      duration: "",
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
      <section className="homerecentportfolio grays fullwidth">
        <div className="container">
          <div className="categories">
            <div className="row">
              {this.state.Categories.length > 0
                ? this.state.Categories.map((category, index) => {
                    return <ViewMp3 category={category.category} />;
                  })
                : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ViewMP3;
