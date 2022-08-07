import React, { useState, useEffect } from 'react';

interface commentListData {
  id: string;
  content: string;
}

interface commentListType {
  postId: string;
}
const CommentList = ({ postId }: commentListType) => {
  const [CommentContentList, setCommentContentList] = useState<
    commentListData[]
  >([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:4001/posts/${postId}/comments`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { data } = await res.json();
      console.log('comment list', { data });
      setCommentContentList(data);
    })();
  }, []);

  return (
    <div>
      <h5>Comment List</h5>
      <ul>
        {CommentContentList &&
          CommentContentList.length !== 0 &&
          CommentContentList.map(({ id, content }) => (
            <li key={id}>
              <p>{content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
