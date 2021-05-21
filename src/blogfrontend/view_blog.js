import React from "react";
import firebase from "./../Config";
import "./../index.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import ViewBlog1 from "./../blogfrontend/ViewBlog";
import renderHTML from "react-render-html";
class ViewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      image: "",
      category: "",
      created_on: new Date().toLocaleString(),
      Categories: [],
      BlogList: [],
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
                    return <ViewBlog1 category={category.category} />;
                  })
                : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ViewBlog;
