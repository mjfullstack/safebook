import React from "react";
import './style.css';
import { MuiThemeProvider, style } from '@material-ui/core/styles/MuiThemeProvider';

// import RaisedButton from 'material-ui/RaisedButton';
// import StepButton from 'material-ui/StepButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from "react-router-dom";
// import { withState } from "recompose";
import 'typeface-roboto';
// import { StepButton } from "material-ui";
// import { theme } from "../../theme.js";


// const styles = { // NOT being applied
//   buttonStyle: {
//     // backgroundColor: "#aaa",
//     backgroundColor: 'blue'
//   }
// }

// const myTheme = createMuiTheme ({
//   overrides: {
//     MuiButton: {
//       FlatButton: {
//         color: 'white',
//       },
//     },
//   }
// })

class FixedNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      logged_in_status: props.logged_in_status
    }
  }

  handleSafeBookClick (e, logged_in_status) {
    e.preventDefault();
    console.log("FixedNavbar handleSafeBookClick - props.logged_in_status: ", logged_in_status);
    console.log("FixedNavbar handleSafeBookClick - this.state.logged_in_status: ", this.state.logged_in_status);
    if ( logged_in_status) {
      return this.props.history.push("/home");
    } else {
      return this.props.history.push("/");
    }
  }
  render () {
    const { logged_in_status } = this.props;
    // const {currentScore, highScore, wonDisplayed} = this.props;
    // console.log(`Score: ${currentScore} High Score: ${highScore}`);
    // console.log(`wonDisplayed: ${wonDisplayed}`);
  return (
    <div>
     {/* <MuiThemeProvider theme={theme}> */}
     <MuiThemeProvider >
        <nav className="navbar fixed-top tc" role="navigation">
          <div className="container-fluid">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            {/* <div className="navbar-header"> */}
            {/* <a className='nav navbar-nav' href='/home'><h1 className='tc f1'>SafeBook</h1></a> */}
            {/* <FlatButton theme='dark' color='black' label='SAFEBOOK' primary={true} style={style} className='nav navbar-nav tc f1 mySafeHeader' role='button' >SafeBook</FlatButton> */}
            {/* <ul className="nav navbar-nav tc">
              <li > {<FlatButton theme='dark' color='black' label='SAFEBOOK' primary={true} style={style} className='nav navbar-nav tc f1 mySafeHeader' role='button' >SafeBook</FlatButton>} </li>
            </ul> */}
                 <FlatButton label='SafeBook' centerRipple backgroundColor='blue' primary={true} style={style} className='nav navbar-nav tc f1 mySafeHeader' onClick={(event) => this.handleSafeBookClick(event, logged_in_status)} ></FlatButton>
                 {/* <RaisedButton label='SafeBook' centerRipple backgroundColor='blue' primary={true} style={style} className='nav navbar-nav tc f1 mySafeHeader' onClick={(event) => this.handleSafeBookClick(event, logged_in_status)} ></RaisedButton> */}
                 {/* <StepButton label='SafeBook' primary={true} style={style} className='nav navbar-nav tc f1 mySafeHeader' onClick={(event) => this.handleSafeBookClick(event, logged_in_status)} ></StepButton> */}
                 {/* <FlatButton onClick={(event) => this.handleSafeBookClick(event, logged_in_status)} overrides={MuiButton= {FlatButton= {color='white', label='SafeBook', className='nav navbar-nav', }}}>safebook</FlatButton> */}
            {/* <RaisedButton className='nav navbar-nav' role='button' onClick={(event) => this.handleSafeBookClick(event, logged_in_status)}><h1 className='tc f1'>SafeBook</h1></RaisedButton> */}
            {/* <button className='nav navbar-nav' role='button' onClick={(event) => this.handleSafeBookClick(event, logged_in_status)}><h1 className='tc f1'>SafeBook</h1></button> */}
              {/* <ul className="nav navbar-nav tc">
                <li ><a  href='/home'><h1 className='tc f1'>SafeBook</h1></a></li> 
              </ul> */}
            {/* </div> */}

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="pull-left"><button target="_blank" rel="noopener noreferrer" href="#">Dashboard</button></li>
                <li className="active"><button target="_blank" rel="noopener noreferrer" href="#">Stories</button></li>
                <li><button target="_blank" rel="noopener noreferrer" href="#">Videos</button></li>
                <li><button target="_blank" rel="noopener noreferrer" href="#">Photos</button></li>
                <li className="social pull-right"><button href="#">Social Links</button></li>
              </ul>
            </div> {/* <!-- /.navbar-collapse --> */}
          </div> {/* <!-- /.container-fluid --> */}
        </nav>
        </MuiThemeProvider>
    </div>
  )
  }
};

  export default withRouter (FixedNavbar);

