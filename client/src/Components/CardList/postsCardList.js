// Parent of Card.js
import React from 'react';
import PostsCard from '../Card/postsCard';

const PostsCardList = ({ posts }) => {
  console.log("PostsList -- Posts: ", posts)
  const postsArray = posts.map((post, i) => {
    return ( 
      <PostsCard 
        post={post[i].post}
        username_posted={post[i].username_posted}
        created_date={post[i].created_date}
      />
    )
  })
  return (
    <div className="container"> {/**  w-20 here makes whole list so small can't see it! **/}
      {postsArray}
    </div>
  )
};

export default PostsCardList;