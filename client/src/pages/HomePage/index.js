import React from "react";
import './style.css';
import CardList from "../../Components/CardList";
import PostsList from "../../Components/CardList/postsCardList"
import ProfileList from "../../Components/CardList/profileCardList"
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
    return this.props.history.push("/finduser");
  }

  // When the component mounts, load all user and save the state
  // componentDidMount() {
  componentWillMount() {
    this.loadUserProfile();
    // this.loadUserProfilePosts(); // Like this is a race condition!
  }

  // Loads all user profile and sets state for User
  loadUserProfile = () => {
    if ( this.state.user[0]) {
      // API.getUser(this.state.im_logged_in.username)
      API.getUser(this.state.user[0].username)
        .then(res =>
          this.setState({ user: res.data }, () => {
            // this.setState({ user: res.data, im_logged_in: res.data[0] }, () => {
            // console.log("HOME LoadUserProfile - this.state.user[0]: ", this.state.user[0])
            // console.log("HOME LoadUserProfile - this.state.im_logged_in: ", this.state.im_logged_in)
          })
        )
        .then(
          this.loadUserProfilePosts()
        )
        .catch(err => console.log("loadUserProfile err: ", err));
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
            // console.log("HOME LoadUserProfilePosts - NO POSTS TO LOAD");
        }
      })
      .catch(err => console.log("loadUserProfilePosts err: ", err));
  };

  render() {
    // console.log(`HOME LOADED this.state.im_logged_in: ${JSON.stringify(this.state.im_logged_in)}`)
    // console.log(`HOME LOADED this.state.user: ${JSON.stringify(this.state.user)}`)
    // console.log(`HOME LOADED this.state.posts ${JSON.stringify(this.state.posts)}`)
    // const {users, logged_in_status} = this.props;
    // console.log("HomePage - this.props.users: ", users);
    // console.log("HomePage - this.state.user: ", this.state.user)
    // if (this.state.im_logged_in) {
    if (this.state.user[0]) {
      // console.log("HomePage this.state.im_logged_in.username: ", this.state.im_logged_in.username)
    } else {
      // console.log("HomePage this.state.im_logged_in.username: User is not logged in.");
      return <h1 className='tc myPageTitle' >User is not logged in!</h1>
    }
    return (
      <div>
        <h2 className='paddingTitle'>User's Home Page - All Your Friends!</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-12 padding">
              <button type="button" className="btn btn-secondary marginButton"
                onClick={(event) => this.handleGoToSearchClick(event)}
                ><i className="fas fa-search sb-ico-margin"></i>Go To Search
              </button>
            </div> {/* Col */}
          </div> {/* Row */}
          {/* {this.state.user === null && <div />} */}
          <div className="row">
            <div className="col-md-4 padding">
              {this.state.user && this.state.user.length &&  <h1>Profile</h1>}
                <ProfileList
                  users={[this.state.user[0]]} 
                  // users={[users[0]]} 
                />
            </div> {/* Col */}          
            {/* {this.state.posts === null && <div />} */}
            <div className="col-md-4 padding">
              {this.state.posts && this.state.posts.length && <h1>Posts Feed</h1>}
                <PostsList
                  // posts={[this.state.posts]}
                  posts={this.state.posts} // Don't think it needs wrapping array
                />
              {/* {this.state.user === null && <div />} */}
            </div> {/* Col */}          
            <div className="col-md-4 padding">
              {this.state.user && this.state.user.length && <h1>All Users List</h1>}
                <CardList
                  users={this.state.all_users}
                />
            </div> {/* Col */}          
          </div> {/* Row */}
        </div> {/* Container */}
      </div>
    )
  }
};

export default HomePage;
