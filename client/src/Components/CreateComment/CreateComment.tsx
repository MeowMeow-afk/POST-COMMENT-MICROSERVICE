import React, { useState } from 'react';
import { console } from '@Utils';

interface CreateCommentType {
  postId: string;
}

const CreateComment = ({ postId }: CreateCommentType) => {
  const [comment, setComment] = useState<string>('');

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: comment }),
    });
    const response = await res.json();
    console({ response });
  };
  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="add comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>Add Comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
