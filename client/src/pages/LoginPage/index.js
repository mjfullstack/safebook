import React, { Component } from 'react';
import API from "../../utils/API"
import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      token: '',
      logged_in_status: props.logged_in_status,
      all_users: []
    }
  }

  handleGoToRegisterClick = (event) => {
    // location.href = "/register"
  }

  // Loads all loggedInUser  and sets them to this.state.books
  loadUserProfile = (loggedInUser) => {
    API.getUser(loggedInUser)
      .then((res) => {
        // console.log("LoginPage loadUserProfile  loggedInUser: " , loggedInUser)
        return ({ res })
      })
      .catch(err => console.log("LoginPage LoadUserProfile err: ", err));
  };


  handleLoginClick = async (e, topState, set_logged_in) => {
    try {
      // New Login Object
      const loginUser = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        token: this.state.token,
        logged_in_status: this.state.logged_in_status,
        all_users: this.state.all_users
      }
      console.log("ENTRY to handleLoginClick - JSON.stringify(loginUser): ", JSON.stringify(loginUser));
      console.log("ENTRY to handleLoginClick - loginUser.logged_in_status: ", loginUser.logged_in_status);

      /////////////////////////////////////////
      // POST METHOD to send data to backend
      /////////////////////////////////////////
      e.preventDefault();
      var getDataURL = "/api/users/login";
      // console.log("LoginPage ENTRY to handleLoginClick - JSON.stringify(loginUser): ", JSON.stringify(loginUser));
      const res = await fetch(getDataURL,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginUser)
        }, function (error) {
          alert("Login Error: ", error.message);
        }
      )

      const regRes = await res.json();
      // console.log('LoginPage handleClick LOGIN regRes: ', regRes);

      if (regRes.token && regRes.token_for) {
        // console.log("LoginPage COMPARE this.state.email and token_for: ", this.state.email, "token_for: ", regRes.token_for);
        loginUser.token = regRes.token;
        if (loginUser.email === regRes.token_for) {
          // console.log("LoginPage COMPARE Matched");
          loginUser.logged_in_status = true;
          await this.setState({ logged_in_status: true })
          // console.log("LoginPage handleClick LOGIN - this.state.logged_in_status: ", this.state.logged_in_status);
          await set_logged_in(this.state.logged_in_status);
          /////////////////////////////////////////
          // GET METHOD to retrieve ALL usersdata to backend
          /////////////////////////////////////////
          API.getAllUsers()
            .then(async (resGet) => {
              this.setState({ all_users: resGet.data });
              // console.log("LOGIN PAGE getAllUsers - this.state.all_users", this.state.all_users);

              // console.log("LoginPage handleLoginClick loginUser.username : ", loginUser.username)
              await this.loadUserProfile(loginUser.username);
              // console.log('BEFORE AWAIT')
              loginUser.all_users = this.state.all_users;
              await topState(loginUser); //
              // console.log('AFTER AWAIT') 
              return this.props.history.push("/home"); // Zack's recommendation
            })
            .catch(err => console.log(err));
        }
      } else {
        alert("Login Failed. \nTry Re-entering credentials")
        return this.props.history.push("/"); // Zack's recommendation
        // there is also a redirect function
      }
    } catch (err) {
      console.log("Login Page Says: Line 106", err); // 
      console.log("Login Page Says: Line 107", err.message); // 
    }
  }

  render() {
    const { topLevelState, set_logged_in } = this.props;
    return (
      <div className="container">
        <h2 className="paddingTitle">Enter Credentials</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <input type="email"
                placeholder="e-mail"
                className="form-control"
                onChange={(event) => this.setState({ email: event.target.value })}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="text"
                placeholder="username"
                className="form-control"
                onChange={(event) => this.setState({ username: event.target.value })}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="password"
                placeholder="password"
                className="form-control"
                onChange={(event) => this.setState({ password: event.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 padding">
            <button type="button" className="btn btn-secondary marginButton" onClick={(event) => this.handleLoginClick(event, topLevelState, set_logged_in)}>Login</button>
          </div>
          <div className="col-md-12 padding">
            <h5 className="tc f5">Not yet a member?</h5>
          </div>
          <div className="col-md-12 padding">
            <a href="/register" className="btn btn-secondary marginButton" >Register</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;