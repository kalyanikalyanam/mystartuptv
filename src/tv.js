import React from "react";
import Live from "./live";
import ReactHlsPlayer from "react-hls-player";
class Tv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
    };
  }

  render() {
    return (
      <>
        <section className="container-fluid fullwidth pb-25 pt-25 orange-bg">
          <div className="container">
            <div className="row">
              <div className="tv-box">
                {/* <ReactHlsPlayer
                  className="hls-player"
                  src="https://5dd3981940faa.streamlock.net:443/mystartuptv/mystartuptv/playlist.m3u8"
                  autoPlay={true}
                  controls={true}
                /> */}
                <Live />
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-3 slider_title"></div>
                <div className="col-md-9 share_css slider_title">
                  <a
                    href="https://www.facebook.com/mystartuptvin/"
                    className="facebook"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="https://twitter.com/mystartuptv" className="twitter">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  {/* <a href='#'className="whatsapp"><i className="fab fa-whatsapp" aria-hidden="true"></i></a> */}

                  <a
                    href="https://www.linkedin.com/company/my-startup-tv"
                    className="linkedin"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/mystartuptv/"
                    className="instagram"
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tv;
