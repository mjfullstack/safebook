// Child of Cardlist.js
import React from 'react'; // Required for JSX i.e. <div> below is

const PostsCard = (props) => {  
  const { 
          post, 
          username_posted,
          // username_page,
          created_date,
        } = props;
  return ( // return ONE component i.e. div
    <div>
      <h1>Posts</h1>
          <h2>Post: {post}</h2>
          <h2>Post By: {username_posted}</h2><br />
          <h2>Post Date: {created_date}</h2><br />
    </div>
  )
}

export default PostsCard;

/* <div className='tc bg-green dit br3 pa2 ma2 grow bw2 shadow-5 fl w-20 card'> 
<div className="card-body">
   <p>Post: {post}</p>
   <p>Post By: {username_posted}</p>
   <p>Post Date: {created_date}</p>
</div>
</div> */