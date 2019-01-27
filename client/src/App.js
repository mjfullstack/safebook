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
      users: [],
    }
  }


  setTopState = (newUser) => {
    this.setState((pvSt) => {
      const updatedUsers = pvSt.users.concat(newUser);
      // console.log("AFTER PUSH in APP.setTopState - this.state.users[0]: ", this.state.users[0]);
      return ({users: updatedUsers})
    })
  }




  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    console.log("event.target.value: ", event.target.value);
  };

  render() {
    console.log("AFTER PUSH in APP.render - this.state.users[0]: ", this.state.users[0]);
    // MUST populate state.users[] from database
    // to avoid no-persistence work-around
    const filteredUsers = this.state.users.filter(user => {
      return user.first_name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <Router>
        <div className='tc'> {/** tc = tachyon text-align: center;  **/}
          <FixedNavbar
            currentScore={this.state.currentScore}
            highScore={this.state.highScore}
            wonDisplayed={this.state.wonDisplayed}
          />

          <Switch>
            <Route exact path="/register"
              render={(props) => <Register {...props} 
              topLevelState={(newUser) => this.setTopState(newUser)}
              />}
            />
            <Route exact path="/" component={Login} />
            <Route exact path="/home" 
              render={(props) => <HomePage {...props}
              // EDGAR suggested (not req'd) ---> componentDidMount={(props) => <HomePage {...props}
              users={filteredUsers}
             />}
            />
            <Route exact path="/finduser" 
              render={(props) => <FindUser {...props}
              users={filteredUsers}
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

