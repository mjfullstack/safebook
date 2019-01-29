import axios from "axios";

export default {
  // Get all users
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  }
};
