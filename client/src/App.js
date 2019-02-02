import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import FindUser from "./pages/FindUser";
import HomePage from "./pages/HomePage";
import NoMatch from "./pages/NoMatch";
import './App.css';
import FixedNavbar from './Components/FixedNavbar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      cardClicked: '',
      friends: [],
      im_logged_in: {}, // Object
      logged_in_status: false // Boolean to track across app
    }
  }
  setLoggedInStatus = (logged_in_status) => {
    this.setState({logged_in_status: logged_in_status})
    console.log("App setLoggedInStatus: What goes into im_logged_in: ", logged_in_status);
    return ({logged_in_status: logged_in_status})
  }

  setTopState = (newUser) => {
    this.setState((pvSt) => {
      // console.log("App setTopState: What goes into im_logged_in: ", newUser);
      return ({im_logged_in: newUser})
      // return this.setState({im_logged_in: newUser})
      // const updatedUsers = pvSt.users.concat(newUser);
      // console.log("AFTER PUSH in APP.setTopState - this.state.users[0]: ", this.state.users[0]);
      // return ({users: updatedUsers})
    })
  }




  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    console.log("event.target.value: ", event.target.value);
  };

  render() {
    console.log("AFTER SetSTATE in APP.render - this.state.im_logged_in: ", this.state.im_logged_in);
    // MUST populate state.Friends[] from database
    // to avoid no-persistence work-around
    const filteredFriends = this.state.friends.filter(friend => {
      return friend.first_name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <Router>
        <div className='tc'> {/** tc = tachyon text-align: center;  **/}
          <FixedNavbar
            currentScore={this.state.currentScore}
            highScore={this.state.highScore}
            wonDisplayed={this.state.wonDisplayed}
            set_logged_in={(logged_in_status) => this.setLoggedInStatus(logged_in_status)}
            logged_in_status={this.state.logged_in_status}
            />

          <Switch>
            <Route exact path="/register"
              render={(props) => <Register {...props} 
              topLevelState={(newUser) => this.setTopState(newUser)}
              />}
            />
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/"
              render={(props) => <Login {...props} 
              topLevelState={(loginUser) => this.setTopState(loginUser)}
              im_logged_in={this.state.im_logged_in}
              set_logged_in={(logged_in_status) => this.setLoggedInStatus(logged_in_status)}
              />}
            />
            <Route exact path="/home" 
              render={(props) => <HomePage {...props}
              // EDGAR suggested (not req'd) ---> componentDidMount={(props) => <HomePage {...props}
              im_logged_in={this.state.im_logged_in}
              friends={filteredFriends}
             />}
            />
            <Route exact path="/finduser" 
              render={(props) => <FindUser {...props}
              friends={filteredFriends}
              searchChange={(event) => this.setState({searchfield: event.target.value})}
             />}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

