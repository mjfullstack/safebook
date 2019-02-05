import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import CardList from "../../Components/CardList";
import PostsList from "../../Components/CardList/postsCardList"
import API from "../../utils/API"

// const router = require("express").Router();
// ../../controllers/usersController");

class HomePage extends React.Component {
  constructor(props){
    super(props);
    // console.log("HOME PAGE props: ", props);
    this.state = {
      user: props.users,
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
    // this.loadUserProfilePosts();
  }

  // Loads all user profile and sets state for User
  loadUserProfile = () => {
    // API.getUser("sericson")
    API.getUser(this.state.im_logged_in.username)
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ user: res.data, im_logged_in: res.data[0] }, () => {
          console.log("HOME LoadUserProfile - this.state.user[0]: ", this.state.user[0])
          // console.log("HOME LoadUserProfile - this.state.im_logged_in: ", this.state.im_logged_in)
        })
      )
      .then(
        this.loadUserProfilePosts()
      )
      .catch(err => console.log(err));
  };

  // Loads all user profile and sets state for User
  loadUserProfilePosts = () => {
    // API.getPosts("sericson")
    API.getPosts(this.state.im_logged_in.username)
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ posts: res.data }, () => {
          // console.log("HOME LoadUserProfilePosts - (this.state.posts: ", this.state.posts);
          // console.log("HOME LoadUserProfilePosts - (this.state.posts[0]: ", this.state.posts[0]);
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    // console.log(`HOME LOADED this.state.im_logged_in: ${JSON.stringify(this.state.im_logged_in)}`)
    // console.log(`HOME LOADED this.state.user: ${JSON.stringify(this.state.user)}`)
    // console.log(`HOME LOADED this.state.posts ${JSON.stringify(this.state.posts)}`)
    const {users, logged_in_status, im_logged_in} = this.props;
    // No No... this.setState({user: users, logged_in_status: logged_in_status, im_logged_in: im_logged_in})
    console.log("HomePage - this.props.users: ", users);
    console.log("HomePage - this.state.user: ", this.state.user)
    // console.log(this.state.user[0].username)
    if (this.state.im_logged_in) {
      // console.log("HomePage this.state.im_logged_in.username: ", this.state.im_logged_in.username)
    } else {
      // console.log("HomePage this.state.im_logged_in.username: User is not logged in.");
      return <h1 className='tc myPageTitle' >User is not logged in!</h1>
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h2 className='myPageTitle'>User's Home Page - All Your Friends!</h2>
            <RaisedButton
              label="Go To Search"
              primary={true}
              style={style}
              onClick={(event) => this.handleGoToSearchClick(event)}
            />
            {this.state.user === null && <div />}
            {this.state.user && this.state.user.length && 
            <h1>Profile</h1> && (
              <CardList
                // users={[this.state.user[0]]} // Equal to im_logged_in
                users={[users[0]]} // Equal to im_logged_in
              />
            )}
            {this.state.posts === null && <div />}
            {this.state.posts && this.state.posts && 
            <h4>Posts</h4> && (
              <PostsList
                // posts={[this.state.posts]}
                posts={this.state.posts} // Don't think it needs wrapping array
              />
            )} 
            {this.state.user === null && <div />}
            {/* {this.state.user && this.state.user.length && 
            <h1>All Users List</h1> && (
              <CardList
                users={[this.state.all_users]}
              />
            )} */}
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
