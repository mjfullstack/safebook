// Parent of Card.js
import React from 'react';
import Card from '../Card';

const CardList = ({ friends }) => {
  console.log("CardList -- friends: ", friends)
  const cardArray = friends.map((friend) => {
    return ( 
      <Card 
        key={friend.id} 
        id={friend.id} 
        first_name={friend.first_name} 
        middle_name={friend.middle_name} 
        last_name={friend.last_name} 
        username={friend.username} 
        password={friend.password} 
        birthdate={friend.birthdate}
        age={friend.age}
        user_pic={friend.user_pic}
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