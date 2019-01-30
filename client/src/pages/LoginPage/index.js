import React, { Component } from 'react';
import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      username:'',
      password:''
    }
  }

  handleGoToRegisterClick = (event) => {

  }

  handleLoginClick = async (e) => {
    const loginUser = {
      email: this.state.email,
      username:this.state.username,
      password:this.state.password

    }
    /////////////////////////////////////////
    // POST METHOD to send data to backend
    // versus saving in state here!
    /////////////////////////////////////////
    e.preventDefault();
    var getDataURL = "/api/users/login";
    console.log("ENTRY to handleLoginClick - JSON.stringify(loginUser): ", JSON.stringify(loginUser));
    const m = encodeURIComponent(loginUser.email);
    const u = encodeURIComponent(loginUser.username);
    const p = encodeURIComponent(loginUser.password);
    const requestBody = `email=${m}&username=${u}&password=${p}`;
    const res = await fetch(getDataURL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: requestBody
      }, function(error) { // Added error catch to fetch
        alert("Login Error: ",error.message); // String
      }
    )

    // const res = await fetch(getDataURL,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(loginUser)
    //   }
    // )

    const regRes = await res.json();
    console.log('RegisterPage handleClick AWAIT regRes: ', regRes);

/**********************
 * // https://gist.github.com/milon87/109c9263821c0c4bac959ce1b4c3357c
 * // x-www-form-urlencoded post in react native

  getLoginAPI = () => {

    let details = {
        'username': 'username',
        'password': 'demo'
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('url', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);


            AlertIOS.alert(
                "POST Response",
                "Response Body " + JSON.stringify(responseData.role)
            );
        })
        .done();
};     
**********/

    // topState(loginUser); // MUST put in Database HERE
    return this.props.history.push("/home"); // EDGAR workaround no persistence
    // there is also a redirect function
    }



  render() {
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
              <RaisedButton label="Login" href='/home' primary={true} style={style} onClick={(event) => this.handleLoginClick(event)}/>
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