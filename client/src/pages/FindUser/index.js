import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import { MuiThemeProvider, style } from '@material-ui/core/styles/MuiThemeProvider';
import SearchBox from "../../Components/SearchBox";
import './style.css';
import CardList from "../../Components/CardList";

// import { theme } from "../../theme.js";

// const onSearchChange = (event) => {
//   this.setState({ searchfield: event.target.value })
//   console.log("event.target.value: ", event.target.value);
// };

class FindUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: '',
      cardClicked: '',
      user: props.users, // Logged In Individual
      friends: [],
      all_users: props.all_users,
      // im_logged_in: {}, // Object
      logged_in_status: false // Boolean to track across app
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    console.log("FIND USER event.target.value: ", event.target.value);
    console.log("FIND USER this.state.searchfield: ", this.state.searchfield);
  };


  render() {
    const { users, searchChange, all_users } = this.props;
    console.log("FindUserPage - all_users: ", all_users);
    const filteredAllUsers = this.state.all_users.filter(foundUser => {
      return foundUser.first_name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })

    return (
      <div>
     <MuiThemeProvider >
          <div>
            <h2 className='myPageTitle'>Find User - Type Letters to Search Names...</h2>
            <SearchBox
              // searchChange={searchChange} // Root App.onSearchChange
              searchChange={this.onSearchChange}
            />
            <CardList
              users={filteredAllUsers}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
};
  // const style = {
  //   margin: 15,
  // }

export default FindUser;
