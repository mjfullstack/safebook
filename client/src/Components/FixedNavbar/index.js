import React from "react";
import './style.css';

class FixedNavbar extends React.Component {
  render () {
    // const {currentScore, highScore, wonDisplayed} = this.props;
    // console.log(`Score: ${currentScore} High Score: ${highScore}`);
    // console.log(`wonDisplayed: ${wonDisplayed}`);
  return (
    <nav className="navbar fixed-top tc" role="navigation">
      <div className="container-fluid">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        {/* <div className="navbar-header"> */}
        <a className='nav navbar-nav' href='/home'><h1 className='tc f1'>SafeBook</h1></a>
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
  )
  }
};

  export default FixedNavbar;
