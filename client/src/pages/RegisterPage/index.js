import React, { Component } from 'react';
import API from "../../utils/API"
import './style.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      token: '',
      user_pic: '',
      user_id: '',
      birthdate: '',
      age: '',
      phone_number: '',
      pictures: [],
      logged_in_status: props.logged_in_status,
      all_users: [],
      imageURL: ''
    };
  }

  uploadFile = async e => {
    // console.log(`uploading file...`)
    const files = e.target.files;
    // console.log("uploadFile - e.target.files: ", e.target.files);
    // console.log("uploadFile - files: ", files);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'safebook');

    const res = await fetch('https://api.cloudinary.com/v1_1/de2ynheeb/image/upload',
      {
        method: 'POST',
        body: data
      }, function (error) {
        alert("Pic Store Error: ", error.message);
      }
    )
    const file = await res.json();
    // console.log(file);
    this.setState({
      imageURL: file.secure_url,
    });
  }

  displayResults = (data) => {
    // console.log("handleClick - displayResults Got CALLED: ", data);
  };

  handleClick = async (e, topState, set_logged_in) => {
    e.preventDefault();
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
        all_users: this.state.all_users,
        pictures: []
      }
      console.log("ENTRY to handleClick - JSON.stringify(newUser): ", JSON.stringify(newUser));

      /////////////////////////////////////////
      // GET METHOD to retrieve ALL usersdata to backend
      /////////////////////////////////////////
      API.getAllUsers()
        .then(async (resGet) => {
          this.setState({ all_users: resGet.data });
          console.log("REGISTER PAGE getAllUsers - this.state.all_users", this.state.all_users);
          newUser.user_id = resGet.data.length + 1;
          
          // console.log(`RegisterPage handleClick newUser.user_id (ARRAY LENGTH) ${newUser.user_id}`);  
          // console.log('BEFORE AWAIT')
          newUser.all_users = resGet.data;
          // await topState(newUser); //
          // console.log('AFTER AWAIT') 

          /////////////////////////////////////////
          // POST METHOD to send data to backend
          /////////////////////////////////////////
          var postDataURL = "/api/users/register";

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
            phone_number: newUser.phone_number,
          }
          // console.log("handleClick - requestBody: ", requestBody);
          const res = await fetch(postDataURL,
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            }, function (error) {
              alert("Registration Error: ", error.message);
            }
          )

          const regRes = await res.json();
          // console.log("regRes: ", regRes);
          // console.log(`RegisterPage handleClick SUBMIT: regRes.success ${regRes.success}, regRes.data.token: ${regRes.data.token}`);

          if (regRes.data.token && regRes.success) {
            newUser.token = regRes.data.token;
            newUser.logged_in_status = regRes.success;
            this.setState({ logged_in_status: newUser.logged_in_status })
            // console.log("RegisterPage handleClick SUBMIT - this.state.logged_in_status: ", this.state.logged_in_status);
            await set_logged_in(this.state.logged_in_status)

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
        })
        // .then(
        //   this.loadUserProfilePosts()
        // )
        .catch(err => console.log(err));

    } catch (err) {  // DID ALERT and STAYED on PAGE...
      // DID NOT print an err or err.message!!! 
      // BUT this IS where we'll
      // handle existing email, username errors
      // but NOT for MVP!!!
      // USER already existed landed here.
      alert("Register Page Says: Line 147", err.message); // TypeError: failed to get JSON
    }
  }


  render() {
    const { topLevelState, set_logged_in } = this.props;
    return (
      <div>
        <div className="container">
          <h2 className='paddingTitle'> Registration</h2>
          <h2>Enter e-mail, username and password:</h2>
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
          <h2 className="paddingTitle">Enter Name:</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input type="text"
                  placeholder="First Name"
                  className="form-control"
                  onChange={(event) => this.setState({ first_name: event.target.value })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text"
                  placeholder="Middle Name"
                  className="form-control"
                  onChange={(event) => this.setState({ middle_name: event.target.value })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text"
                  placeholder="Last Name"
                  className="form-control"
                  onChange={(event) => this.setState({ last_name: event.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input type="date"
                  placeholder="Birthdate"
                  className="form-control"
                  onChange={(event) => this.setState({ birthdate: event.target.value })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="number"
                  placeholder="Enter your Age"
                  className="form-control"
                  onChange={(event) => this.setState({ age: event.target.value })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="phone"
                  placeholder="Enter your Phone Number"
                  className="form-control"
                  onChange={(event) => this.setState({ phone_number: event.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <input className='pa4'
                type="file"
                id="file"
                name="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile}
              />
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              {this.state.imageURL && <img className='pa4' src={this.state.imageURL} alt="Upload Preview" width="auto" height='200' />}
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row">
            <div className="col-md-12 padding">
              <button type="button" className="btn btn-secondary marginButton" onClick={(event) => this.handleClick(event, topLevelState, set_logged_in)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;