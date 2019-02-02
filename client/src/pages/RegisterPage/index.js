import React, { Component } from 'react';
import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      username:'',
      password:'',
      token: '',
      logged_in_status: false,
      user_pic: '',
      birthdate: '',
      age: '',
      phone_number: '',
      id: 0,
      pictures: [],
      imageURL: ''
    };
  }

  uploadFile = async e => {
    console.log(`uploading file...`)
    const files = e.target.files;
    console.log("uploadFile - e.target.files: ", e.target.files);
    console.log("uploadFile - files: ", files);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'safebook');

    const res = await fetch('https://api.cloudinary.com/v1_1/de2ynheeb/image/upload',
      {
        method: 'POST',
        body: data
      }, function(error) { 
        alert("Pic Store Error: ",error.message);
      }
    )
    const file = await res.json();
    console.log(file);
    this.setState({
      imageURL: file.secure_url,
    });
  }

  displayResults = (data) => {
    console.log("handleClick - displayResults Got CALLED: ", data);
  };

  handleClick = async (e, topState) => { 
    try {
      // New User Object
      const newUser = {
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        token: this.state.token,
        logged_in_status: this.state.logged_in_status,
        user_id: this.state.user_id,
        user_pic: this.state.imageURL,
        birthdate: this.state.birthdate,
        age: this.state.age,
        phone_number: this.state.phone_number,
        id: this.state.id + 1,
        pictures: []
      }

      /////////////////////////////////////////
      // POST METHOD to send data to backend
      /////////////////////////////////////////
      e.preventDefault();
      var getDataURL = "/api/users/register";
      console.log("ENTRY to handleClick - JSON.stringify(newUser): ", JSON.stringify(newUser));

      // This IS what gets put into the Mongo DB at the backend
      const requestBody = { 
        first_name: newUser.first_name,
        middle_name: newUser.middle_name,
        last_name: newUser.last_name,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        token: newUser.token,
        logged_in_status: newUser.logged_in_status,
        user_id: newUser.user_id,
        user_pic: newUser.user_pic,
        birthdate: newUser.birthdate,
        age: newUser.age,
        phone_number: newUser.phone_number
      }
      console.log("handleClick - requestBody: ", requestBody);
      const res = await fetch(getDataURL,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }, function(error) { 
          alert("Registration Error: ",error.message);
        }
      )

      const regRes = await res.json();
      console.log("regRes: ", regRes);
      console.log(`RegisterPage handleClick SUBMIT: regRes.success ${regRes.success}, regRes.data.token: ${regRes.data.token}`);

      if (regRes.data.token && regRes.success) {
        newUser.token = regRes.data.token;
        newUser.logged_in_status = regRes.success;
        await topState(newUser); 
        return this.props.history.push("/home"); // Zack's recommendation
      } else {
        alert("Registration Failed. Already Registered?\nTry Logging In")
        return this.props.history.push("/register"); // Zack's recommendation
      }
      // there is also a redirect function
      //     res.json( // ADD THIS TI DIRECT BASED ON TOKEN PRESENT
      //       {"token":token,
      //       "token_for":req.body.email --- THIS COMES WITH LOGIN
      // });
    } catch(err) {  // DID ALERT and STAYED on PAGE...
                    // DID NOT print an err or err.message!!! 
                    // BUT this IS where we'll
                    // handle existing email, username errors
                    // but NOT for MVP!!!
                    // USER already existed landed here.
    alert("Register Page Says: Line 147", err.message); // TypeError: failed to get JSON
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
            <h2 className='myPageTitle'> Registration</h2>
            <h4 className='myPageSubTitle'>Enter e-mail, username and password:</h4>
            <Row >
              <Col size='md-4' margin='0rem' >
                <TextField className='dataEntry'
                  type="email"
                  hintText="Enter your e-mail"
                  floatingLabelText="e-mail"
                  onChange = {(event,newValue) => this.setState({email:newValue})}
                />
              </Col>
              <Col size='md-4' margin='0rem' >
                <TextField className='dataEntry'
                  type="username"
                  hintText="Select a Username"
                  floatingLabelText="Username"
                  onChange = {(event,newValue) => this.setState({username:newValue})}
                />
              </Col>
              <Col size='md-4' margin='0rem'>
                <TextField className='dataEntry'
                  type="password"
                  hintText="Select a Password"
                  floatingLabelText="Password"
                  onChange = {(event,newValue) => this.setState({password:newValue})}
                />
              </Col>
            </Row>
            <h4 className='myPageSubTitle'>Enter Name:</h4>
            <Row >
              <Col size='md-4' margin='0rem'>
                <TextField className='dataEntry'
                  hintText="Enter your FIRST name"
                  floatingLabelText="First Name"
                  onChange = {(event,newValue) => this.setState({first_name:newValue})}
                />
              </Col>
              <Col size='md-4'>
                <TextField className='dataEntry'
                  hintText="Enter your MIDDLE name"
                  floatingLabelText="Middle Name"
                  onChange = {(event,newValue) => this.setState({middle_name:newValue})}
                />
              </Col>
              <Col size='md-4'>
                <TextField className='dataEntry'
                  hintText="Enter your LAST name"
                  floatingLabelText="Last Name"
                  onChange = {(event,newValue) => this.setState({last_name:newValue})}
                />
              </Col>
            </Row>
            <Row>
            <Col size='md-4' margin='0rem'>
                <TextField className='dataEntry'
                  type="date"
                  hintText=""
                  floatingLabelText="Birthdate"
                  onChange = {(event,newValue) => this.setState({birthdate:newValue})}
                />
              </Col>
              <Col size='md-4'>
                <TextField className='dataEntry'
                  type="number"
                  hintText="Enter your Age"
                  floatingLabelText="Age"
                  onChange = {(event,newValue) => this.setState({age:newValue})}
                />
              </Col>
              <Col size='md-4'>
                <TextField className='dataEntry'
                  type="phone"
                  hintText="Enter your Phone Number"
                  floatingLabelText="Phone Number"
                  onChange = {(event,newValue) => this.setState({phone_number:newValue})}
                />
              </Col>

            </Row>
            <Row >
              <Col size='md-4' margin='2rem' />
              <Col size='md-4' margin='2rem'>
              <input className='pa4'
                type="file" 
                id="file" 
                name="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile} 
                />
              </Col>
              <Col size='md-4' margin='2rem' />
            </Row>
            <Row >
              <Col size='md-4' margin='2rem' />
              <Col size='md-4' margin='2rem' >
                {this.state.imageURL && <img className='pa4' src={this.state.imageURL} alt="Upload Preview" width="200" height='200'/>}
              </Col>
              <Col size='md-4' margin='2rem' />
            </Row>
          </Container>
          <RaisedButton 
            label="Submit"
            // href="/home" // Using onClick function and props.hsitory.push to get to next page
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event, topLevelState)}
          />
        </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Register;