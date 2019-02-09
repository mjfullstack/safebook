// Parent of Card.js
import React from 'react';
import ProfileCard from '../sbCard/profileCard';

const profileCardList = ({ users }) => {
  // console.log("CardList -- Users: ", users)
  const cardArray = users.map((user, idx) => {
    return ( 
      <ProfileCard 
        key={idx }
        first_name={user.first_name} 
        middle_name={user.middle_name} 
        last_name={user.last_name} 
        username={user.username} 
        password={user.password} 
        birthdate={user.birthdate}
        age={user.age}
        user_pic={user.user_pic}
        user_id={user.user_id}
        email={user.email}
        
      />
    )
  })
  return (
    <div className="container" > {/**  w-20 here makes whole list so small can't see it! **/}
      {cardArray}
    </div>
  )
};

export default profileCardList;