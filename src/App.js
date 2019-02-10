import React, { Component } from "react";
import BusinessCatalog from "./components/business/BusinessCatalog";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./components/home/NavigationBar";
import Home from "./components/home/Home";
import SignUpForm from "./components/user/SignUpForm";
import LoginForm from "./components/user/LoginForm";
import UserProfile from "./components/user/UserProfile";
import SearchPage from "./components/business/SearchPage";
import RegisterBusiness from "./components/business/RegisterBusiness";
import EditBusiness from "./components/business/EditBusiness";
import BusinessProfile from "./components/business/BusinessProfile";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={5000} />
        <NavigationBar />
        <Route exact strict path="/businesses" component={BusinessCatalog} />
        <Route exact strict path="/businesses/:businessId" component={BusinessProfile}/>
        <Route exact strict path="/" component={Home} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/authuser/userprofile" component={UserProfile} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/search_results" component={BusinessCatalog} />
        <Route exact path="/register_business" component={RegisterBusiness}/>
        <Route exact path="/edit/:businessId" component={EditBusiness}/>
      </div>
    );
  }
}

export default App;
