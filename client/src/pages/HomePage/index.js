import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import CardList from "../../Components/CardList";
import PostsList from "../../Components/CardList/postsCardList"
import API from "../../utils/API"
// import API from "../utils/API";

// const router = require("express").Router();
// ../../controllers/usersController");

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      logged_in_status: props.logged_in_status, // Page's status
      im_logged_in: props.im_logged_in, // Using this OBJECT below
      posts: {}
    };
  }

  handleGoToSearchClick(event) {
    event.preventDefault();
    return this.props.history.push("/finduser"); // EDGAR workaround no persistence
  }

  // When the component mounts, load all user and save the state
  // componentDidMount() {
  componentWillMount() {
    this.loadUserProfile();
    this.loadUserProfilePosts();
  }

  // Loads all user profile and sets state for User
  loadUserProfile = () => {
    // API.getUser("sericson")
    API.getUser(this.state.im_logged_in.username)
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ user: res.data, im_logged_in: res.data[0] }, () => {
          console.log("HOME LoadUserProfile - this.state.user[0]: ", this.state.user[0])
          console.log("HOME LoadUserProfile - this.state.im_logged_in: ", this.state.im_logged_in)
        })
      )
      // .then(
      //   this.loadUserProfilePosts()
      // )
      .catch(err => console.log(err));
  };

  // Loads all user profile and sets state for User
  loadUserProfilePosts = () => {
    // API.getPosts("sericson")
    API.getPosts(this.state.im_logged_in.username)
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ posts: res.data }, () => {
          console.log("HOME LoadUserProfile - (this.state.posts: ", this.state.posts);
          console.log("HOME LoadUserProfile - (this.state.posts[0]: ", this.state.posts[0]);
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    console.log(`HOME LOADED ${JSON.stringify(this.state.im_logged_in)}`)
    console.log(`HOME LOADED ${JSON.stringify(this.state.users)}`)
    console.log(`HOME LOADED ${JSON.stringify(this.state.posts)}`)
    const {users  } = this.props;
    console.log("HomePage - users: ", users);
    console.log("HomePage - this.state.user: ", this.state.user)
    // console.log(this.state.user[0].username)
    if (this.state.im_logged_in) {
      console.log("HomePage this.state.im_logged_in.username: ", this.state.im_logged_in.username)
    } else {
      console.log("HomePage this.state.im_logged_in.username: User is not logged in.");
      return <h1 className='tc myPageTitle' >User is not logged in!</h1>
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h2 className='myPageTitle'>User's Home Page - All Your Friends!</h2>
            {/* <img className='tc profilePic' alt='Profile Pic Coming Soon!' src={this.state.im_logged_in.user_pic} />
            <h5 className='userDetails'>
            Username: {this.state.im_logged_in ? this.state.im_logged_in.username : ""}
            <br />
            First Name: {this.state.im_logged_in ? this.state.im_logged_in.first_name : ""}
            {this.state.im_logged_in.middle_name ? <br /> : ''}
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
            </h5> */}
            <RaisedButton
              label="Go To Search"
              // href='/finduser' // Need to change from href to onClick handleGoToSearchClick
              primary={true}
              style={style}
              onClick={(event) => this.handleGoToSearchClick(event)}
            />
            {/* <h1>
              Profile - HARD CODED? FROM this.state.user[0]
            </h1>
            <h2>
              Username: {this.state.user ? this.state.user[0].username : ""}
              <br />
              First Name: {this.state.user ? this.state.user[0].first_name : ""}
              <br />
              Last Name: {this.state.user ? this.state.user[0].last_name : ""}
              <br />
              Email: {this.state.user ? this.state.user[0].email : ""}
              <br />
              Age: {this.state.user ? this.state.user[0].age : ""}
              <br />
              Birth Date: {this.state.user ? this.state.user[0].birthdate : ""}
            </h2>
            <h1>
              Posts
            </h1>
            <h2>
              Posts
            </h2> */}
            {this.state.user === null && <div />}
            {this.state.user && this.state.user.length && (
              <CardList
                // users={[{username: "sericson"}]}
                users={[this.state.user[0]]}
              // users={users}
              />

            )}
            {this.state.posts === null && <div />}
            {this.state.posts && this.state.posts && (
              <PostsList
                // users={[{username: "sericson"}]}
                // posts={[this.state.posts]}
                posts={this.state.posts}
              // users={users}
              />
            )}           
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
