import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import CardList from "../../Components/CardList";
import API from "../../utils/API"
// import API from "../utils/API";

// const router = require("express").Router();
// ../../controllers/usersController");

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // username: ""
      // first_name: ""
      user: null,
      im_logged_in: props.im_logged_in
    };
  }

  handleGoToSearchClick(event) {
    event.preventDefault();
    return this.props.history.push("/finduser"); // EDGAR workaround no persistence
  }

  // When the component mounts, load all user and save the state
  componentDidMount() {
    console.log("HomePage componentDidMount this.state.im_logged_in.username: ", this.state.im_logged_in.username );
    const loadedProfile = this.loadUserProfile(this.state.im_logged_in.username);
    // this.setState({ user: res.data, im_logged_in: res.data }, ()=>{
    this.setState( loadedProfile, ()=>{
        console.log("HomePage loadUserProfile - res.data: ", loadedProfile);
    })
  }

  // Loads all books  and sets them to this.state.books
  loadUserProfile = (loggedInUser) => {
    // API.getUser("sericson")
    API.getUser(loggedInUser)
     .then((res) => { 
       console.log("HomePage loadUserProfile  loggedInUser: " , loggedInUser)
       console.log("HomePage loadUserProfile  res: " , res)
       return ({ user: res.data, im_logged_in: res.data }) 
      // .then(res =>
      //   // this.setState({ user: res.data })
      //   this.setState({ user: res.data, im_logged_in: res.data }, ()=>{
      //     console.log("HomePage loadUserProfile - res.data: ", res.data);
      //   })
      // )
    })
      .catch(err => console.log("HomePage LoadUserProfile err: ", err));
  };

  render() {
    const { friends } = this.props;
    // this.loadUserProfile(this.state.im_logged_in.username);
    console.log("HomePage - friends: ", friends);
    console.log("HomePage this.state.user: ", this.state.user);
    console.log("HomePage this.state.im_logged_in: ", this.state.im_logged_in);
    console.log("HomePage this.state.im_logged_in.username: ", this.state.im_logged_in.username);
    if (this.state.im_logged_in.username) {
      console.log("HomePage this.state.im_logged_in.username: ", this.state.im_logged_in.username)
    } else {
      console.log("HomePage this.state.im_logged_in.username: User is not logged in.")
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {/* <h2 className='myPageTitle'>User's Home Page - All Your Friends - Click one to Shuffle!</h2> */}
            <h2 className='myPageTitle'>User's Home Page - All Your Friends!</h2>
            <img className='tc profilePic' alt='Profile Pic Coming Soon!' src={this.state.im_logged_in.user_pic} />
            <h5 className='userDetails'>
            Username: {this.state.im_logged_in ? this.state.im_logged_in.username : ""}
            <br />
            First Name: {this.state.im_logged_in ? this.state.im_logged_in.first_name : ""}
            <br />
            {this.state.im_logged_in.middle_name ? 'Middle Name: ' + this.state.im_logged_in.middle_name : ''}
            <br />
            Last Name: {this.state.im_logged_in ? this.state.im_logged_in.last_name : ""}
            <br />
            Email: {this.state.im_logged_in ? this.state.im_logged_in.email : ""}
            <br />
            Age: {this.state.im_logged_in ? this.state.im_logged_in.age : ""}
            <br />
            Logged In Status: {this.state.im_logged_in ? this.state.im_logged_in.logged_in_status : ""}
            <br />
            Phone Number: {this.state.im_logged_in ? this.state.im_logged_in.phone_number : ""}
            <br />
            User Id: {this.state.im_logged_in ? this.state.im_logged_in.user_id : ""}
            <br />
            </h5>
            <RaisedButton
              label="Go To Search"
              href='/finduser'
              primary={true}
              style={style}
              onClick={(event) => this.handleGoToSearchClick(event)}
            />
            <CardList
              friends={friends}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
};
const style = {
  margin: 15,
}

export default HomePage;
