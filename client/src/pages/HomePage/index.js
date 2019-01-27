import React from "react";
// import {Container, Row, Col} from '../../Components/Grid/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RoboList from "../../Components/CardList/RoboList";
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import CardList from "../../Components/CardList";

// function HomePage ({ robots, users, shuffle, getRoboID}) {
class HomePage extends React.Component {

  handleGoToSearchClick(event) {
    event.preventDefault();
    return this.props.history.push("/finduser"); // EDGAR workaround no persistence
  }
  
  render() {
    const { robots, users, shuffle, getRoboID} = this.props;
    console.log("HomePage - users: ", users);
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
            <CardList
              users={users}
            />
            <RoboList
              robots={robots}
              shuffle={shuffle}
              getRoboID={getRoboID}
            />
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
