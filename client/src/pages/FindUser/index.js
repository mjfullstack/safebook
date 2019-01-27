import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBox from "../../Components/SearchBox";
import './style.css';
import CardList from "../../Components/CardList";


// const onSearchChange = (event) => {
//   this.setState({ searchfield: event.target.value })
//   console.log("event.target.value: ", event.target.value);
// };

class FindUser extends React.Component {
  render() {
    const { users, searchChange } = this.props;
    console.log("FindUserPage - users: ", users);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h2 className='myPageTitle'>Find User - Type Letters to Search Names...</h2>
            <SearchBox
              searchChange={searchChange}
            />
            <CardList
              users={users}
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
