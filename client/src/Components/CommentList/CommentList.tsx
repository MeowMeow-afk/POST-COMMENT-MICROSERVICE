import React from 'react';

interface commentListProp {
  id: string;
  postId: string;
  content: string;
}

const CommentList = ({ commentList }: { commentList: commentListProp[] }) => (
  <div>
    <h5>Comment List</h5>
    <ul>
      {commentList &&
        commentList.length !== 0 &&
        commentList.map(({ id, content }) => (
          <li key={id}>
            <p>{content}</p>
          </li>
        ))}
    </ul>
  </div>
);

export default CommentList;
