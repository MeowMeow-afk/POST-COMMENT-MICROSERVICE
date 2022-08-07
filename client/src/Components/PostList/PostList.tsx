import { CreateComment, CommentList } from '@Components';
// import { console } from '@Utils';
import React, { useState, useEffect } from 'react';

interface commentsList {
  id: string;
  postId: string;
  content: string;
}
interface postListData {
  id: string;
  title: string;
  comments: commentsList[];
}

const PostList = () => {
  const [postContentList, setPostContentList] = useState<postListData[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4003/getAllPost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await res.json();
      setPostContentList(data);
    })();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {postContentList &&
          postContentList.length !== 0 &&
          postContentList.map(({ id, title, comments }) => (
            <li key={id}>
              <p>{title}</p>
              <CommentList commentList={comments} />
              <CreateComment postId={id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostList;
