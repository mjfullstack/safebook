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
      {/* <h4>Posts</h4> */}
          <h6>Post: {post}</h6>
          <h6>Post By: {username_posted}</h6>
          <h6>Post Date: {created_date}</h6><br />
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