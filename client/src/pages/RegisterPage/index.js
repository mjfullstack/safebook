import React, { Component } from 'react';
import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';


// import ImageUploader from 'react-images-upload';
// import {Image} from 'cloudinary-react';


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

  handleClick = async (e, topState) => { //  (event, topState) { 
    // event.preventDefault(); // EDGAR workaround no persistence
    // Single user object
    const newUser = {
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username:this.state.username,
      password:this.state.password,
      user_pic: this.state.imageURL,
      birthdate: this.state.birthdate,
      age: this.state.age,
      phone_number: this.state.phone_number,
      id: this.state.id + 1,
      pictures: [this.state.imageURL]
    }

    console.log("ENTRY to handleClick - newUser: ", newUser);

    /////////////////////////////////////////
    // POST METHOD to send data to backend
    // versus saving in state here!
    /////////////////////////////////////////
    e.preventDefault();
    var getDataURL = "/api/users/register";
    console.log("ENTRY to handleClick - JSON.stringify(newUser): ", JSON.stringify(newUser));
    const m = encodeURIComponent(newUser.email);
    const u = encodeURIComponent(newUser.username);
    const p = encodeURIComponent(newUser.password);
    const requestBody = `email=${m}&username=${u}&password=${p}`;
    const res = await fetch(getDataURL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: requestBody
      }
    )

    const regRes = await res.json();
    console.log('RegisterPage handleClick AWAIT regRes: ', regRes);

    // const sawError = done 


/********************** Alternate Method **************
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





/****
    // WORKED, before url encoding for real login with token
    const res = await fetch(getDataURL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      }
    )
     ******/





    topState(newUser); // MUST put in Database HERE
    return this.props.history.push("/register"); // was /home, EDGAR workaround no persistence
    // there is also a redirect function
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
                  floatingLabelText="phone_number"
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
            // href="/home"
            // href="#"
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