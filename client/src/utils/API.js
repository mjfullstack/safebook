import axios from "axios";

export default {
  // Get all users - I think we'll want this, too
  getAllUsers: function() {
    // console.log("API getAllUsers GOT HIT!!!: " )
    return axios.get("/api/users/allusers");
    // return axios.get("/allusers");
  },
  // Get SPECIFIC user
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  },
  getPosts: function(username) {
    return axios.get("/api/posts/" + username + "/posts")
  }
};

