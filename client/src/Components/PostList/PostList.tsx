import React, { useState } from 'react';
import { console } from '@Utils';

const PostList = () => {
  const [postContent, setPostContent] = useState<string>('');
  const createPost = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console(postContent);
  };
  return (
    <div>
      <h1>Create a post</h1>
      <form onSubmit={(e) => createPost(e)}>
        <input
          placeholder="write content here"
          value={postContent}
          onChange={({ target }) => setPostContent(target.value)}
        />
        <button onClick={(e) => createPost(e)}>Submit</button>
      </form>
    </div>
  );
};

export default PostList;
