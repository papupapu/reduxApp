import React from 'react';
import PropTypes from 'prop-types';

import './Posts.css';

const PostListPropTypes = {
  isFetchingFeed: PropTypes.bool.isRequired,
  feedSelectedChannel: PropTypes.string.isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  lastFetch: PropTypes.string,
  refreshChannel: PropTypes.func.isRequired,
};

const PostListDefaultProps = {
  lastFetch: '',
};

const PostList = ({ posts }) => (
  <ul>
    {
      posts.map(
        (post, index) => {
          const ind = index;
          const imgflag = post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== '' && post.thumbnail_height > 50;
          return (
            <li key={`post-${ind}`}>
              <h2>{post.title}</h2>
              <p className="postinfos">
                author: <strong>{post.author}</strong>
                {
                  post.num_comments > 0 &&
                    <span>comments: <strong>{post.num_comments}</strong></span>
                }
              </p>
              {
                imgflag &&
                  <img src={post.thumbnail} alt={post.title} />
              }
              <p className="text">{post.selftext}</p>
            </li>
          );
        },
      )
    }
  </ul>
);

PostList.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired,
};

const Posts = ({ isFetchingFeed, feedSelectedChannel, posts, lastFetch, refreshChannel }) => (
  <div className="posts">
    <h1>{feedSelectedChannel}</h1>
    {
      !isFetchingFeed &&
        <p className="time">
          Last updated: {lastFetch}
          {' '}-{' '}
          <a
            href=""
            onClick={(e) => { e.preventDefault(); refreshChannel(feedSelectedChannel); }}
            title="Get the latest posts"
          >
            Refresh feed
          </a>
        </p>
    }
    <div
      style={{ opacity: isFetchingFeed ? 0.5 : 1 }}
    >
      {
        posts.length > 0 &&
          <PostList
            posts={posts}
          />
      }
    </div>
  </div>
);

Posts.propTypes = PostListPropTypes;
Posts.defaultProps = PostListDefaultProps;
export default Posts;
