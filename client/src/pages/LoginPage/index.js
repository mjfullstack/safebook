import React, { Component } from 'react';
import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
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
      logged_in_status: false,
      im_logged_in: {}
    }
  }

  handleGoToRegisterClick = (event) => {

  }

  // Loads all books  and sets them to this.state.books
  loadUserProfile = (loggedInUser) => {
    // API.getUser("sericson")
    API.getUser(loggedInUser)
    .then((res) => { 
      const profileFound = res.data;
      console.log("LoginPage loadUserProfile  loggedInUser: " , loggedInUser)
      // console.log("LoginPage loadUserProfile  res: " , res)
      // console.log("LoginPage loadUserProfile  profileFound: " , profileFound)
      return ({ res }) 
     // .then(res =>
      //   // this.setState({ user: res.data })
      //   this.setState({im_logged_in: res.data }, ()=>{
      //     console.log("LoginPage loadUserProfile - res.data: ", res.data);
      //   })
      // )
    })
      .catch(err => console.log("LoginPage LoadUserProfile err: ", err));
  };


  handleLoginClick = async (e, topState) => { 
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
      // versus saving in state here!
      /////////////////////////////////////////
      e.preventDefault();
      var getDataURL = "/api/users/login";
      console.log("LoginPage ENTRY to handleLoginClick - JSON.stringify(loginUser): ", JSON.stringify(loginUser));
      const res = await fetch(getDataURL,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginUser)
        }, function(error) { // Added error catch to fetch
          alert("Login Error: ",error.message); // String
        }
      )

      const regRes = await res.json();
      console.log('LoginPage handleClick LOGIN regRes: ', regRes);

      if (regRes.token && regRes.token_for) {
        console.log("LoginPage COMPARE this.state.email and token_for: ", this.state.email, "token_for: ", regRes.token_for);
        loginUser.token = regRes.token;
        if (loginUser.email === regRes.token_for) {
          console.log("LoginPage COMPARE Matched");
          loginUser.logged_in_status = true;
        }
        // const profileToLoad = this.loadUserProfile(regRes.token_for);
        console.log("LoginPage handleLoginClick loginUser.username : ", loginUser.username)
        // let profileToLoad = this.loadUserProfile(loginUser.username);
        await this.loadUserProfile(loginUser.username);
        // console.log('LoginPage handleClick Before TopStateCall profileToLoad: ', profileToLoad);
        // let profileToLoad2 = this.loadUserProfile(this.loginUser.username);
        // console.log('LoginPage handleClick Before TopStateCall profileToLoad2: ', profileToLoad2);
        // console.log("LoginPage handleLoginClick this.loadUserProfile(loginUser.username) : ", this.loadUserProfile(loginUser.username));
        // console.log('LoginPage handleClick Before TopStateCall profileToLoad.im_logged_in: ', profileToLoad.im_logged_in);
        console.log('BEFORE AWAIT')
        await topState(loginUser); //
        console.log('AFTER AWAIT') 
        return this.props.history.push("/home"); // Zack's recommendation
      } else {
        alert("Login Failed. \nTry Re-entering credentials")
        return this.props.history.push("/"); // Zack's recommendation
        // there is also a redirect function
      }
    } catch(err) {  // DID What... This ALERTS even when login was successful...
      // alert("Login Page Says: Line 75", err.message); // 
      console.log("Login Page Says: Line 105", err); // 
      console.log("Login Page Says: Line 106", err.message); // 
    }
  }



  render() {
    const {topLevelState} = this.props;
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
              </Row>
            </Container>
              {/* <RaisedButton label="Login" href='/home' primary={true} style={style} onClick={(event) => this.handleLoginClick(event)}/> */}
              <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleLoginClick(event, topLevelState)}/>
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