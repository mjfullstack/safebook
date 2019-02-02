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

  state = {
    // username: ""
    // first_name: ""
    user: null,
    posts: null
  };

  handleGoToSearchClick(event) {
    event.preventDefault();
    return this.props.history.push("/finduser"); // EDGAR workaround no persistence
  }

  // When the component mounts, load all user and save the state
  componentDidMount() {
    this.loadUserProfile();
    this.loadUserProfilePosts();
  }

  // Loads all user profile and sets state for User
  loadUserProfile = () => {
    API.getUser("sericson")
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ user: res.data }, () => {
          console.log(this.state.user[0])
        })
      )
      .catch(err => console.log(err));
  };

  // Loads all user profile and sets state for User
  loadUserProfilePosts = () => {
    API.getPosts("sericson")
      .then(res =>
        // this.setState({ user: res.data })
        this.setState({ posts: res.data }, () => {
          console.log(this.state.posts)
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { users } = this.props;
    console.log("HomePage - users: ", users);
    console.log(this.state.user)
    // console.log(this.state.user[0].username)
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h2 className='myPageTitle'>User's Home Page - All Your Friends - Click one to Shuffle!</h2>
            <RaisedButton
              label="Go To Search"
              href='/finduser'
              primary={true}
              style={style}
              onClick={(event) => this.handleGoToSearchClick(event)}
            />
            {/* <h1>
              Profile
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

            )

            }
            {this.state.posts === null && <div />}
            {this.state.posts && this.state.posts && (
              <PostsList
                // users={[{username: "sericson"}]}
                posts={[this.state.posts]}
              // users={users}
              />

            )

            }
            
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
