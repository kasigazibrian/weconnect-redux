import React, { Component } from 'react';
import BusinessCatalog from "./components/business/BusinessCatalog";
import { Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import NavigationBar from "./components/home/NavigationBar";
import Home from "./components/home/Home";
import SignUpForm from "./components/user/SignUpForm";
import LoginForm from "./components/user/LoginForm";
import UserProfile from "./components/user/UserProfile";
import SearchPage from "./components/business/SearchPage";

class App extends Component {
  render() {
    // const Routes = () => (
    //   <div>
    //     <Route exact strict path='/businesses' component={BusinessCatalog}/>
    //   </div>
    // );


    return (
      <div>
        <ToastContainer autoClose={5000}/>
        <NavigationBar/>
        <Route exact strict path='/businesses' component={BusinessCatalog}/>
        <Route exact strict path="/" component={Home} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/authuser/userprofile" component={UserProfile} />
        <Route exact path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default App;
