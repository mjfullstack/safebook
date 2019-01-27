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
    username:'',
    password:''
    }
  }

  handleGoToRegisterClick = (event) => {

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
                <Col size='md-2' margin='0rem' />
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