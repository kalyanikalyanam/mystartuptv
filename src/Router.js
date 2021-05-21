import React from "react";
import "./App.css";
//import Home from './Home';
import Analytics from "react-router-ga";
// FrontPage
import Header from "./Header";
import Footer from "./Footer";

import App from "./App";
import ViewNewsPage from "./ViewNewsPage";
import Specific from "./Specific";
import TodaysNews from "./Admin/TodaysNews";
import EditorPickPage from "./EditorPickPage";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//login
import ChangePassword from "./Admin/ChangePassword";
import ChangeEmail from "./Admin/changeEmail";
import Login from "./Login";
import Subscribe from "./subscribe";

import Button from "./Button";
import Sample from "./Sample";
import AboutUs from "./AboutUs";

//import EditorPickPage1 from './neweditorpickpage';
import Home1 from "./Home1";
import TvHome from "./tvhome";
import Live from "./live";

import ViewCountList from "./Admin/ViewCountList";

//news
import ViewNewsPage1 from "./ViewNewsPage1";
import CreateNewsPage from "./Admin/CreateNewsPage";

import AddNews from "./Admin/add_news";

import EditNews from "./Admin/edit_news";
import EditNewsPage1 from "./Admin/edit_news_page";

import EditNewsPage from "./Admin/EditNewsPage";
import EditNewsPageList from "./Admin/EditNewsPageList";
import TopStartupNewsPage from "./TopStartupNewsPage";

//category
import AddCategory from "./Admin/AddCategory";
import CategoryListPage from "./Admin/CategoryListPage";
import EditCategory from "./Admin/EditCategory";

//privacy policy
import AddPrivacyPolicy from "./Admin/privacy_policy";

import Loaderpage from "./Loaderpage";
import Loaderpage1 from "./Loaderpage1";

// Admin Header
import AdminHeader from "./Admin/Header";
import AdminFooter from "./Admin/Footer";
import AdminSidebar from "./Admin/Sidebar";
import Dashboard from "./Admin/Dashboard";

//Contact
import ContactUs from "./ContactUs";
import ContactUsListPage from "./Admin/ContactUsListPage";

//Contribute Admin
import ContributeList from "./Admin/contribute/contribute_list";
import ViewContribute from "./Admin/contribute/view_contribute";

//Contribute Frontend
import Contribute from "./contributefrontend/contribute";

//Recommonded Admin
import RecommondedList from "./Admin/recommended/recommonded_list";
import ViewRecommended from "./Admin/recommended/view_recommended";

//Recommonded Frontend
import Recommonded from "./recommendedfrontend/recommonded";

//Work With Us

import WorkWithUs from "./workwithus";
import WorkWithUsList from "./Admin/workwithus_list";

//Advertise With Us
import AdvertiseWithUs from "./advertisewithus";
import AdvertiseWithUsList from "./Admin/advertisewithus_list";

import PrivacyPolicy from "./privacypolicy";
import CookiePolicy from "./cookiepolicy";

//Blog Admin
import AddBlog from "./Admin/blog/add_blog";
import BlogList from "./Admin/blog/blog_list";
import EditBlog from "./Admin/blog/edit_blog";
import BlogTodaysNews from "./Admin/blog/BlogTodaysNews";
//blog Frontend
import BlogSeperatePage from "./blogfrontend/BlogSeperatePage";
import BlogHome from "./blogfrontend/blog_home";
import BlogSpecific from "./blogfrontend/BlogSpecific";
import BlogSpecificNew from "./blogfrontend/blog_specific_new";
import BlogEditorPickPage from "./blogfrontend/BlogEditorPickPage";

//podcast Admin
import AddMP3 from "./Admin/podcast/add_mp3";
import MP3List from "./Admin/podcast/MP3List";
import EditMP3 from "./Admin/podcast/edit_mp3";
import PodcastTodaysNews from "./Admin/podcast/PodcastTodaysNews";

//podcast Frontend
//import ViewMP3 from './view_mp3';
import podcastHome from "./podcastfrontend/podcast_home";
import PodcastSeperatePage from "./podcastfrontend/podcastseperatepage";
import PodcastSpecific from "./podcastfrontend/PodcastSpecific";
import PodcastEditorPickPage from "./podcastfrontend/PodcastEditorsPickPage";

import Comments from "./Admin/comments";
import Code from "./code";

export const PrivateRoute = ({ component: Admin, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("RoleId") ? (
        <Admin {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/Login",
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Analytics id="UA-156545575-1" debug>
          <Route path="/" exact component={Home1} />
          <Route path="/TvHome" exact component={TvHome} />
          <Route path="/Live" exact component={Live} />
          <Route path="/Header" exact component={Header} />
          <Route path="/Loaderpage" component={Loaderpage} />
          <Route path="/Loaderpage1" component={Loaderpage1} />
          <Route path="/ViewNewsPage" exact component={ViewNewsPage} />
          <Route path="/Footer" exact component={Footer} />
          <Route path="/App" exact component={App} />
          <Route path="/Specific/:newsId" component={Specific} />
          <Route
            path="/TopStartupNewsPage/:categoryID"
            exact
            component={TopStartupNewsPage}
          />
          <Route path="/Login" exact component={Login} />
          <Route path="/Subscribe" exact component={Subscribe} />
          <Route path="/AboutUs" exact component={AboutUs} />
          <Route path="/Button" exact component={Button} />
          <Route path="/Sample" exact component={Sample} />
          {/* <Route path="/neweditorpickpage/:editorId" exact component={EditorPickPage1} /> */}
          <Route path="/Home1" exact component={Home1} />
          <Route path="/ViewNewsPage1" exact component={ViewNewsPage1} />
          <PrivateRoute
            path="/Admin/ViewCountList"
            exact
            component={ViewCountList}
          />
          <PrivateRoute
            path="/Admin/CreateNewsPage"
            exact
            component={CreateNewsPage}
          />
          <Route path="/Admin/AddNews" exact component={AddNews} />
          <Route path="/Admin/EditNews/:editId" exact component={EditNews} />
          <Route path="/Admin/EditNewsPage1" exact component={EditNewsPage1} />
          <PrivateRoute
            path="/Admin/EditNewsPageList"
            exact
            component={EditNewsPageList}
          />
          <PrivateRoute
            path="/Admin/EditNewsPage/:editId"
            exact
            component={EditNewsPage}
          />
          {/* News Editor Pick */}
          <Route
            path="/EditorPickPage/:editorId"
            exact
            component={EditorPickPage}
          />
          <PrivateRoute path="/Admin/TodaysNews" exact component={TodaysNews} />
          {/* Admin  Side  */}
          <PrivateRoute path="/Admin/Dashboard" exact component={Dashboard} />
          <PrivateRoute path="/Admin/Footer" exact component={AdminFooter} />
          <PrivateRoute path="/Admin/Header" exact component={AdminHeader} />
          <PrivateRoute path="/Admin/Sidebar" exact component={AdminSidebar} />
          <PrivateRoute
            path="/Admin/ChangePassword"
            exact
            component={ChangePassword}
          />
          <PrivateRoute
            path="/Admin/ChangeEmail"
            exact
            component={ChangeEmail}
          />
          {/* <PrivateRoute path="/Admin/AddCategory" exact component={AddCategory} /> */}
          <Route path="/ContactUs" exact component={ContactUs} />
          <PrivateRoute
            path="/Admin/ContactUsListPage"
            exact
            component={ContactUsListPage}
          />
          <Route path="/Contribute" exact component={Contribute} />
          <PrivateRoute
            path="/Admin/ContributeList"
            exact
            component={ContributeList}
          />
          <PrivateRoute path="/Admin/Comments" exact component={Comments} />

          <PrivateRoute
            path="/Admin/ViewContribute/:contributeId"
            exact
            component={ViewContribute}
          />
          <PrivateRoute
            path="/Admin/AddCategory"
            exact
            component={AddCategory}
          />
          <PrivateRoute
            path="/Admin/AddPrivacyPolicy"
            exact
            component={AddPrivacyPolicy}
          />
          <PrivateRoute
            path="/Admin/CategoryListPage"
            exact
            component={CategoryListPage}
          />
          <PrivateRoute
            path="/Admin/EditCategory/:categoryId"
            exact
            component={EditCategory}
          />
          <Route path="/WorkWithUs" exact component={WorkWithUs} />
          <PrivateRoute
            path="/Admin/WorkWithUsList/"
            exact
            component={WorkWithUsList}
          />
          <Route path="/AdvertiseWithUs" exact component={AdvertiseWithUs} />
          <PrivateRoute
            path="/Admin/AdvertiseWithUsList/"
            exact
            component={AdvertiseWithUsList}
          />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route path="/cookie-policy" exact component={CookiePolicy} />
          <Route path="/Recommonded" exact component={Recommonded} />
          <PrivateRoute
            path="/Admin/RecommondedList/"
            exact
            component={RecommondedList}
          />
          <PrivateRoute
            path="/Admin/ViewRecommended/:recommondedId"
            exact
            component={ViewRecommended}
          />
          {/* blog  Admin*/}
          <PrivateRoute path="/Admin/BlogList" exact component={BlogList} />
          <PrivateRoute path="/Admin/AddBlog" exact component={AddBlog} />
          <PrivateRoute
            path="/Admin/EditBlog/:blogId"
            exact
            component={EditBlog}
          />
          <PrivateRoute
            path="/Admin/BlogTodaysNews"
            exact
            component={BlogTodaysNews}
          />
          {/* blog  Frontend*/}
          <Route path="/BlogHome" exact component={BlogHome} />
          <Route
            path="/BlogEditorPickPage/:blogeditorId"
            exact
            component={BlogEditorPickPage}
          />
          <Route
            path="/BlogSeperatePage/:categoryID"
            exact
            component={BlogSeperatePage}
          />
          <Route path="/BlogSpecific/:blogId" component={BlogSpecific} />
          <Route path="/BlogSpecificNew/:blogId" component={BlogSpecificNew} />
          {/* Podcast  Admin*/}
          <PrivateRoute path="/Admin/MP3List" exact component={MP3List} />
          <PrivateRoute path="/Admin/AddMP3" exact component={AddMP3} />
          <PrivateRoute
            path="/Admin/EditMP3/:mp3Id"
            exact
            component={EditMP3}
          />
          <PrivateRoute
            path="/Admin/PodcastTodaysNews"
            exact
            component={PodcastTodaysNews}
          />
          {/* Podcast Frontend */}
          <Route path="/podcastHome" exact component={podcastHome} />
          <Route
            path="/PodcastEditorPickPage/:mp3editorId"
            exact
            component={PodcastEditorPickPage}
          />
          <Route
            path="/PodcastSeperatePage/:categoryID"
            exact
            component={PodcastSeperatePage}
          />
          <Route path="/PodcastSpecific/:mp3Id" component={PodcastSpecific} />
          <Route path="/09mnfpztajx64hkduplw2vet8st1bq.html" component={Code} />
        </Analytics>
      </Router>
    );
  }
}
export default AppRouter;
