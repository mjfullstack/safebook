// Child of Cardlist.js
// Friends and ALL users card
import React from 'react'; // Required for JSX i.e. <div> below is
// import { Card, thumbnail } from 'react-bootstrap';
import {  Card, CardImg, CardText, CardBody,
          CardTitle, CardSubtitle, Button } from 'reactstrap';

const SearchCard = (props) => {  
  const { 
          user_id, 
          // id,
          first_name,
          middle_name,
          last_name,
          username,
          // password,
          user_pic,
          birthdate,
          age,
          email,
          // pictures
        } = props;

  return ( // return ONE component i.e. div
    <div>
      <div className="col-md-4 padding">
        <Card style={{ width: 'auto' }}>
          <CardImg variant="top" className='tc profilePic cardImg' alt='Profile Pic Coming Soon!' src={user_pic} width="auto" height='350' max-width="75%" max-height="75%"/>
          <CardBody>
            <CardTitle>{first_name + ' '} {middle_name ? middle_name + ' ' : ''} {last_name} </CardTitle>
            <CardText>
              Username: {username}<br />
              User ID: {user_id}
            </CardText>
            {/* <button type="button" className="btn btn-secondary marginButton" onClick={(event) => this.handleClick(event, topLevelState, set_logged_in)}>Submit</button> */}
            <Button variant="primary">Friend Request</Button>
            {/* <button type="button" className="btn btn-secondary marginButton" >Friend Request</button> */}
          </CardBody>
        </Card>
        <br />
      </div> {/** Col **/}
    </div>
  )
}

export default SearchCard;

