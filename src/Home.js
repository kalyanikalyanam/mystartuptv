import React from "react";
import "./index.css";
import Header from "./Header";
import EditorPickPage from "./EditorPickPage";
import ViewNewsPage from "./ViewNewsPage";
import Footer from "./Footer";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <EditorPickPage />
        <ViewNewsPage />
        <Footer />
      </div>
    );
  }
}
export default Home;
