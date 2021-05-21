import React from "react";
import "./../index.css";
import Header from "./../Header";
import PodcastEditorPickPage from "./../podcastfrontend/PodcastEditorsPickPage";
import ViewMP3 from "./../podcastfrontend/view_mp3";
import Footer from "./../Footer";
import PodcastRecentUploads from "./../podcastfrontend/PadcastRecentUploads";
// import PodcastMostPopular from "./../podcastfrontend/PodcastMostPopular";

class PodcastHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <PodcastEditorPickPage />
        <PodcastRecentUploads />
        {/* <PodcastMostPopular /> */}
        <ViewMP3 />
        <Footer />
      </div>
    );
  }
}
export default PodcastHome;
