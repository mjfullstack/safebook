// Child of Cardlist.js
import React from 'react'; // Required for JSX i.e. <div> below is

const Card = (props) => {  
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
      {/* <h1>Profile</h1> */}
      <img className='tc profilePic' alt='Profile Pic Coming Soon!' src={user_pic} />
      <h6>
          Username: {username}<br />
          First Name: {first_name}<br />
          Middle Name: {middle_name}<br />
          Last Name: {last_name}<br />
          Email: {email}<br />
          Age: {age}<br />
          BirthDate: {birthdate}<br />
          User ID: {user_id}<br />
      </h6>
    </div>
  )
}

export default Card;

// <div className='tc bg-green dit br3 pa2 ma2 grow bw2 shadow-5 fl w-20 card'> 
//        <img className='tc' src={user_pic} alt='Locating User'/>
//        <div className="card-body">
//           <p className="card-title">{first_name} {middle_name} {last_name}</p>
//           <p>Username: {username}</p>
//           <p>User ID: {user_id}</p>
//           <p>Birth Date:{birthdate}</p>
//           <p>Age: {age}</p>
//           {/* <p className="tl">e-mail: {email}</p> */}
//        </div>
//     </div>