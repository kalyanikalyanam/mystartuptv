import React from "react";
import { Link, withRouter } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <div className="fixedmenu">
        <div className="container" style={{ height: "60px" }}>
          <div className="row navbar">
            <Link to="/" className="navbar-brand">
              <img
                src="/img/mystartuptvlogo (1).png"
                alt=""
                style={{ height: "50px" }}
              ></img>
            </Link>
            <div className="mobilemenu">
              <ul>
                <li className={this.isPathActive("/Home") ? "active" : null}>
                  <Link to="/">
                    <span className="hidden-xs hidden-sm">Home</span>
                  </Link>
                </li>

                <li
                  className={this.isPathActive("/BlogHome") ? "active" : null}
                >
                  <Link to="/BlogHome" data-target="#">
                    <span className="hidden-xs hidden-sm">My Startup Life</span>
                  </Link>
                </li>

                <li
                  className={
                    this.isPathActive("/PodcastHome") ? "active" : null
                  }
                >
                  <Link to="/PodcastHome" data-target="#">
                    <span className="hidden-xs hidden-sm">Podcast</span>
                  </Link>
                </li>

                <li
                  className={this.isPathActive("/contribute") ? "active" : null}
                >
                  <Link to="/contribute" data-target="#">
                    <span className="hidden-xs hidden-sm">Contribute</span>
                  </Link>
                </li>

                <li
                  className={
                    this.isPathActive("/recommonded") ? "active" : null
                  }
                >
                  <Link to="/recommonded" data-target="#">
                    <span className="hidden-xs hidden-sm">Recommended</span>
                  </Link>
                </li>
              </ul>
            </div>

            <nav className="navbar pull-right" role="navigation">
              <div className="collapse navbar-collapse">
                <ul id="main-menu" className="nav navbar-nav nav-rounded">
                  <li className={this.isPathActive("/Home1") ? "active" : null}>
                    <Link to="/Home1" data-target="#">
                      <span className="hidden-xs hidden-sm">Home</span>
                    </Link>
                  </li>
                  <li
                    className={this.isPathActive("/BlogHome") ? "active" : null}
                  >
                    <Link to="/BlogHome" data-target="#">
                      <span className="hidden-xs hidden-sm">
                        {" "}
                        My Startup Life
                      </span>
                    </Link>
                  </li>

                  <li
                    className={
                      this.isPathActive("/PodcastHome") ? "active" : null
                    }
                  >
                    <Link to="/PodcastHome" data-target="#">
                      <span className="hidden-xs hidden-sm">Podcast</span>
                    </Link>
                  </li>

                  <li
                    className={
                      this.isPathActive("/contribute") ? "active" : null
                    }
                  >
                    <Link to="/contribute" data-target="#">
                      <span className="hidden-xs hidden-sm">Contribute</span>
                    </Link>
                  </li>
                  <li
                    className={
                      this.isPathActive("/recommonded") ? "active" : null
                    }
                  >
                    <Link to="/recommonded" data-target="#">
                      <span className="hidden-xs hidden-sm">Recommended</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
export default withRouter(Header);
