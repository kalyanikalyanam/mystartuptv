import React from "react";
import { Link, withRouter } from "react-router-dom";

class AdminSidebar extends React.Component {
  render() {
    return (
      <div className="col-md-2 side_bg">
        <div className="navi row">
          <ul>
            <li
              className={
                this.isPathActive("/Admin/Dashboard") ? "active" : null
              }
            >
              <Link to="/Admin/Dashboard">
                <i className="fa fa-tachometer" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Dashboard</span>
              </Link>
            </li>

            {/* <li className={this.isPathActive('/Admin/CategoryListpage') ? 'active' : null}>
                        <Link to="/Admin/CategoryListPage">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            <span className="hidden-xs hidden-sm">Category</span>
                            </Link></li> */}
            <li
              className={
                this.isPathActive("/Admin/CategoryListpage") ? "active" : null
              }
            >
              <Link to="/Admin/CategoryListpage">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Category</span>
              </Link>
            </li>

            {/* <li className={this.isPathActive('/Admin/CreateNewsPage') ? 'active' : null}>
                    <Link to="/Admin/CreateNewsPage"><i className="fa fa-plus" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Create News</span>
                    </Link></li>
                    */}
            <li
              className={
                this.isPathActive("/Admin/EditNewsPageList") ? "active" : null
              }
            >
              <Link to="/Admin/EditNewsPageList">
                <i className="fa fa-video-camera" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">News List</span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/TodaysNews") ? "active" : null
              }
            >
              <Link to="/Admin/TodaysNews">
                <i className="fa fa-check" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">News Editor's Pick</span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/BlogTodaysNews") ? "active" : null
              }
            >
              <Link to="/Admin/BlogTodaysNews">
                <i className="fa fa-check" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Blog Editor's Pick</span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/PodcastTodaysNews") ? "active" : null
              }
            >
              <Link to="/Admin/PodcastTodaysNews">
                <i className="fa fa-check" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">
                  Podcast Editor's Pick
                </span>
              </Link>
            </li>

            {/* <li className={this.isPathActive('/Admin/ViewCountList') ? 'active' : null}>
                     <Link to="/Admin/ViewCountList"><i className="fa fa-calendar" aria-hidden="true"></i>
                     <span className="hidden-xs hidden-sm"> View CountList</span>
                     </Link></li>
                    */}

            <li
              className={this.isPathActive("/Admin/MP3List") ? "active" : null}
            >
              <Link to="/Admin/MP3List">
                <i className="fa fa-headphones" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm"> podcast List </span>
              </Link>
            </li>

            <li
              className={this.isPathActive("/Admin/BlogList") ? "active" : null}
            >
              <Link to="/Admin/BlogList">
                <i className="fa fa-rss-square" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm"> Blog List </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/ContributeList") ? "active" : null
              }
            >
              <Link to="/Admin/ContributeList">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm"> Contribute List</span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/WorkWithUsList") ? "active" : null
              }
            >
              <Link to="/Admin/WorkWithUsList">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm"> Work With Us List</span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/AdvertiseWithUsList")
                  ? "active"
                  : null
              }
            >
              <Link to="/Admin/AdvertiseWithUsList">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">
                  {" "}
                  Advertise With Us List{" "}
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/Admin/RecommondedList") ? "active" : null
              }
            >
              <Link to="/Admin/RecommondedList">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Recommonded List</span>
              </Link>
            </li>
            <li
              className={
                this.isPathActive("/Admin/RecommondedList") ? "active" : null
              }
            >
              <Link to="/Admin/Comments">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Comments List</span>
              </Link>
            </li>

            {/* <li><Link to="#">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Settings</span>
                    </Link> </li> */}

            <li
              className={
                this.isPathActive("/Admin/ContactUsListpage") ? "active" : null
              }
            >
              <Link to="/Admin/ContactUsListpage">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span className="hidden-xs hidden-sm">Contact List</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
export default withRouter(AdminSidebar);
