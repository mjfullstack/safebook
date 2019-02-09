import React from "react";
import './style.css';
import SearchList from "../../Components/CardList/searchList";
import {  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


class FindUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: '',
      cardClicked: '',
      user: props.users, // Logged In Individual
      friends: [],
      all_users: props.all_users,
      logged_in_status: false // Boolean to track across app
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    // console.log("FIND USER event.target.value: ", event.target.value);
    // console.log("FIND USER this.state.searchfield: ", this.state.searchfield);
  };


  render() {
    // const { users, searchChange, all_users } = this.props;
    // console.log("FindUserPage - all_users: ", all_users);
    const filteredAllUsers = this.state.all_users.filter(foundUser => {
      return foundUser.first_name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })

    return (
      // <div>
        <div>
          <h2 className='paddingTitle'><i className='fas fa-search sb-ico-margin'></i>Find User - Type Letters to Search Names...</h2>
          <div className="form-group">
            <input type="text"
              placeholder="Search safebook..."
              className="form-control marginButton"
              // onChange={(event) => this.setState({ searchfield: event.target.value })}
              // searchChange={(event) => this.onSearchChange(event)}
              onChange={(event) => this.onSearchChange(event)}
              />
          </div>
          <div className="container">
            <div className="row">
                <SearchList
                  users={filteredAllUsers}
                />
            </div> {/** Row **/}
          </div> {/** Container **/}
        </div>
      // </div>
    )
  }
};

export default FindUser;
