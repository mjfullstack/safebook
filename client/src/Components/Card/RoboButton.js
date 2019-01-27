// Child of Cardlist.js
import React from 'react'; // Required for JSX i.e. <div> below is

// Function Way, NOT extend component way, CAN'T have functions inside
// const Card = (props) => {
// const RoboButton = ({ id, name, username, email, beenclicked, shuffle }) => {  
export default class RoboButton extends React.Component {

  onRoboBtnClick = (id, shuffle, getRoboID) => {
    console.log("onRoboBtnClick-id: ", id); // id is KNOWN!
    console.log("onRoboBtnClick-getRoboID: ", getRoboID); // id is KNOWN!
    shuffle();
    return getRoboID(id);
  };
  
  
  render() { // EVERY class that extends Component needs a render()
    const {id, name, username, email, shuffle, getRoboID } = this.props;
    // console.log("render - getRoboID: ", getRoboID); // id is KNOWN!
    // console.log("render - id: ", id); // id is KNOWN!
    // console.log("render - shuffle: ", shuffle); // id is KNOWN!
    return ( 
      // return ONE component i.e. button
      <button  
        onClick={() => this.onRoboBtnClick(id, shuffle, getRoboID)} 
        className='tc bg-green dit br3 pa2 ma2 grow bw2 shadow-5 fl w-20 card'>
      {/* <img onClick={() => this.onRoboBtnClick(id)} src={`https://robohash.org/${id}?size=150x150`} alt='RoboFoto'/> */}
        <img className='tc' src={`https://robohash.org/${id}?size=100x100`} alt='RoboFoto'/>
        <div className="card-body tc">
          {/* <p>id: {id}</p> */}
          {/* <p>Clk'd: {beenclicked}</p> */}
          {/* <p className='tc'>Pick ME! </p> */}
          {/* <h5 className="card-title">{name}</h5> */}
          {/* <p>Username: {username}</p> Lorem ipsum*/}
          {/* <p>Username:</p> */}
          <p>{name}</p>
          <p>{username}</p>
          <p className="tl">e-mail: {email}</p>
        </div>
      </button>
    )
  } 
}

