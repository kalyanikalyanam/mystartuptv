import React from "react";
import "./../index.css";
import Header from "./../Header";
import BlogEditorPickPage from "./../blogfrontend/BlogEditorPickPage";
import ViewBlog from "./../blogfrontend/view_blog";
import Footer from "./../Footer";
import BlogRecentUploads from "./../blogfrontend/BlogRecentUploads";
// import BlogMostPopular from "./../blogfrontend//BlogMostPopular";

class BlogHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <BlogEditorPickPage />
        <BlogRecentUploads />
        {/* <BlogMostPopular /> */}
        <ViewBlog />
        <Footer />
      </div>
    );
  }
}
export default BlogHome;
