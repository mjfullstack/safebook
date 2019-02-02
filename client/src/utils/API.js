import axios from "axios";

export default {
  // Get all users - I think we'll want this, too
  // Get SPECIFIC user
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  }
};
