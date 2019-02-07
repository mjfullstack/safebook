import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import CardList from "../../Components/CardList";
import PostsList from "../../Components/CardList/postsCardList"
import API from "../../utils/API"

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: props.users, // Logged In Individual
      logged_in_status: props.logged_in_status, // Page's status
      all_users: props.all_users, // Everyone in DB for now!
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
    if ( this.state.user[0]) {
      // API.getUser(this.state.im_logged_in.username)
      API.getUser(this.state.user[0].username)
        .then(res =>
          this.setState({ user: res.data }, () => {
          // this.setState({ user: res.data, im_logged_in: res.data[0] }, () => {
            console.log("HOME LoadUserProfile - this.state.user[0]: ", this.state.user[0])
            // console.log("HOME LoadUserProfile - this.state.im_logged_in: ", this.state.im_logged_in)
          })
        )
        .then(
          this.loadUserProfilePosts()
        )
        .catch(err => console.log(err));
    } else {
      return <h1>NO USERNAME YET </h1>
    }
  };

  // Loads all user profile and sets state for User
  loadUserProfilePosts = () => {
    // API.getPosts(this.state.im_logged_in.username)
    API.getPosts(this.state.user[0].username)
      .then(res => {
        if (res.data) {
          this.setState({ posts: res.data }, () => {
          })
        } else {
            console.log("HOME LoadUserProfilePosts - NO POSTS TO LOAD");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    // console.log(`HOME LOADED this.state.im_logged_in: ${JSON.stringify(this.state.im_logged_in)}`)
    // console.log(`HOME LOADED this.state.user: ${JSON.stringify(this.state.user)}`)
    // console.log(`HOME LOADED this.state.posts ${JSON.stringify(this.state.posts)}`)
    const {users, getFullName, logged_in_status} = this.props;
    console.log("HomePage - this.props.users: ", users);
    console.log("HomePage - this.state.user: ", this.state.user)
    // if (this.state.im_logged_in) {
    if (this.state.user[0]) {
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
                users={[this.state.user[0]]} // Equal to im_logged_in
                getFullName={getFullName}
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
            {this.state.user && this.state.user.length && 
            <h1>All Users List</h1> && (
              <CardList
                users={this.state.all_users}
                getFullName={getFullName}
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
