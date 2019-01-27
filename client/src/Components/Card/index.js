// Child of Cardlist.js
import React from 'react'; // Required for JSX i.e. <div> below is

const Card = (props) => {  
  const { 
          id, 
          first_name,
          middle_name,
          last_name,
          username,
          // password,
          user_pic,
          birthdate,
          age,
          // pictures
        } = props;
  return ( // return ONE component i.e. div
    <div className='tc bg-green dit br3 pa2 ma2 grow bw2 shadow-5 fl w-20 card'> 
       <img className='tc' src={user_pic} alt='Locating User'/>
       <div className="card-body">
          <p className="card-title">{first_name} {middle_name} {last_name}</p>
          <p>Username: {username}</p>
          <p>ID: {id}</p>
          <p>Birth Date:{birthdate}</p>
          <p>Age: {age}</p>
          {/* <p className="tl">e-mail: {email}</p> */}
       </div>
    </div>
  )
}

export default Card;