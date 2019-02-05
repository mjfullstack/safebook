import React, { Component } from 'react';
import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import API from "../../utils/API"
import './style.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      username:'',
      password:'',
      token: '',
      logged_in_status: props.logged_in_status,
      im_logged_in: {}
    }
  }

  handleGoToRegisterClick = (event) => {

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
        logged_in_status: this.state.logged_in_status
      }

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
        }, function(error) { 
          alert("Login Error: ",error.message);
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
          this.setState({logged_in_status: true})
          // console.log("LoginPage handleClick LOGIN - this.state.logged_in_status: ", this.state.logged_in_status);
          await set_logged_in(this.state.logged_in_status)
        }
        // console.log("LoginPage handleLoginClick loginUser.username : ", loginUser.username)
        await this.loadUserProfile(loginUser.username);
        // console.log('BEFORE AWAIT')
        await topState(loginUser); //
        // console.log('AFTER AWAIT') 
        return this.props.history.push("/home"); // Zack's recommendation
      } else {
        alert("Login Failed. \nTry Re-entering credentials")
        return this.props.history.push("/"); // Zack's recommendation
        // there is also a redirect function
      }
    } catch(err) { 
      console.log("Login Page Says: Line 94", err); // 
      console.log("Login Page Says: Line 95", err.message); // 
    }
  }

  render() {
    const {topLevelState, set_logged_in} = this.props;
      return (
        <div>
          <MuiThemeProvider>
            <div>
            {/* <AppBar
              title="Login"
            /> */}

            <Container fluid='fluid'>
              <h2 className='myPageTitle'>Enter Credentials</h2>
              <Row className='dataEntry'>
                {/* <dialog id="login"> */}
                  {/* <form method="dialog" className="loginForm"> */}
                    <Col size='md-4' margin='0rem'>
                      <TextField className='dataEntry'
                        hintText="Enter your e-mail"
                        floatingLabelText="e-mail"
                        onChange = {(event,newValue) => this.setState({email:newValue})}
                      />
                    </Col>
                    <Col size='md-4' margin='0rem'>
                      <TextField className='dataEntry'
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                      />
                    </Col>
                    <Col size='md-4' margin='0rem'>
                      <TextField className='dataEntry'
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                      />
                    </Col>
                  {/* </form> */}
                {/* </dialog> */}
              </Row>
            </Container>
              <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleLoginClick(event, topLevelState, set_logged_in)}/>
              <h5 className="tc f5">Not yet a member?</h5>
              <RaisedButton label="Register" href='/register' primary={true} style={style} onClick={(event) => this.handleGoToRegisterClick(event)}/>
          </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
  const style = {
  margin: 15,
};

export default Login;