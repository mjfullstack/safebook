// Parent of Card.js
import React from 'react';
import Card from '../Card';

const CardList = ({ users }) => {
  console.log("CardList -- Users: ", users)
  const cardArray = users.map((user, idx) => {
    return ( 
      <Card 
        key={user.id} 
        id={user.id} 
        first_name={user.first_name} 
        middle_name={user.middle_name} 
        last_name={user.last_name} 
        username={user.username} 
        birthdate={user.birthdate}
        age={user.age}
        user_pic={user.user_pic}
      />
    )
  })
  return (
    <div className="container"> {/**  w-20 here makes whole list so small can't see it! **/}
      {cardArray}
    </div>
  )
};

export default CardList;