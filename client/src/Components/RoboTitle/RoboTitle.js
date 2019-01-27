import React from "react";
import './RoboTitle.css';


class RoboTitle extends React.Component {
  render () {
    const {currentScore, highScore, wonDisplayed} = this.props;
    console.log(`Score: ${currentScore} High Score: ${highScore}`);
    console.log(`wonDisplayed: ${wonDisplayed}`);
    return (

      <div className='myPageTitle'>
        <h1 className="f1">ROBO FRIENDS</h1>
        <ul className="nav navbar-nav tc">
          <li className='tc'><h2>Score: {currentScore} -- High Score: {highScore}</h2></li>
          {wonDisplayed ? <li className='tc' id='winner'><h1>You Won!!!</h1></li> : <li></li>}
        </ul>
      </div>
    );
  }
};

export default RoboTitle;