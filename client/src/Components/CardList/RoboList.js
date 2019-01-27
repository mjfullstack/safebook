// Parent of RoboButton.js
// Child of App
import React from 'react';
import RoboButton from '../Card/RoboButton'

class RoboList extends React.Component  {
  
render() {
  const  { robots , shuffle, getRoboID} = this.props;
//  RoboList = ({ robots , shuffle, getRoboID}) => {
  const cardArray = robots.map((robot, idx) => {
    // console.log("RoboList - getRoboID: ", getRoboID); // id is KNOWN!
    // console.log("RoboList - shuffle: ", shuffle); // id is KNOWN!
    return ( <RoboButton
      key={robot.id}
      id={robot.id}
      name={robot.name}
      username={robot.username}
      email={robot.email}
      beenclicked={robot.beenclicked}
      shuffle={shuffle}
      getRoboID={getRoboID}/>
    )
  })
  return (
    <div>
      {/* <SearchBox /> */}
      <div className="container" id='myRoboList'> {/**  w-20 here makes whole list so small can't see it! **/}
        {cardArray}
      </div>
    </div>
  )
}
};

export default RoboList;