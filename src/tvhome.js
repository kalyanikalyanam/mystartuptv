import React from "react";
import "./index.css";
import Header from "./Header";
import EditorPickPage from "./EditorPickPage";
import RecentUploads from "./RecentUploads";
import Footer from "./Footer";
import MostPopular from "./MostPopular";
import ViewNewsPage1 from "./ViewNewsPage1";
import firebase from "./Config";
import Loaderpage from "./Loaderpage";
//import Live from './live';
import Tv from "./tv";

class TvHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });

    var ref = firebase
      .database()
      .ref("News")
      .orderByChild("status")
      .equalTo("Selected");
    ref.once("value", (snapshot) => {
      const data = [];
      console.log(snapshot.val());
      snapshot.forEach((element) => {
        const usersData = {
          newsId: element.key.toString(),
          headline: element.val().headline,
          url: element.val().url,
          content: element.val().content,
          category: element.val().category,
          created_on: element.val().created_on,
        };
        data.unshift(usersData);
      });

      this.setState({ News: data, loading: true }, () => {
        console.log(this.state.News, "News");
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <Header />

            <Tv />

            <MostPopular />
            <ViewNewsPage1 />
            <Footer />
          </div>
        ) : (
          <div className="divLoader">
            <Loaderpage />
          </div>
        )}
      </div>
    );
  }
}
export default TvHome;
