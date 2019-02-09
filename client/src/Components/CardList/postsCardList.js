// Parent of Card.js
import React from 'react';
import PostsCard from '../sbCard/postsCard';

const PostsCardList = ({ posts }) => {
  if (posts[0]) {
    console.log("PostsList -- Posts: ", posts)
    console.log(`PostsCardList JSON posts:  ${JSON.stringify(posts)}`)
    const postsArray = posts.map((post, i) => {
      return ( 
        <PostsCard 
          key={ post._id }
          // post={post ? post[i].post : ''}
          // username_posted={post[i].username_posted ? post[i].username_posted : ''}
          // created_date={post[i].created_date ? post[i].created_date : ''}
          post={post ? post.post : ''}
          username_posted={post.username_posted ? post.username_posted : ''}
          created_date={post.created_date ? post.created_date : ''}
        />
      )
    })
    return (
      <div className="container"> {/**  w-20 here makes whole list so small can't see it! **/}
        {postsArray}
      </div>
    )
  } else {
    return <h2>No Posts to show</h2>
  }
};

export default PostsCardList;