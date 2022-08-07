import React, { useState } from 'react';
// import { console } from '@Utils';

const CreatePost = () => {
  const [postContent, setPostContent] = useState<string>('');
  const createPost = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // const res =
    await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: postContent }),
    });
    // const response = await res.json();
    // console({ response });
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
