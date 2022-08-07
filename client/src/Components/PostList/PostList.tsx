import { CreateComment, CommentList } from '@Components';
import React, { useState, useEffect } from 'react';

interface postListData {
  id: string;
  title: string;
}

const PostList = () => {
  const [postContentList, setPostContentList] = useState<postListData[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4000/posts', {
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
          postContentList.map(({ id, title }) => (
            <li key={id}>
              <p>{title}</p>
              <CommentList postId={id} />
              <CreateComment postId={id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostList;
