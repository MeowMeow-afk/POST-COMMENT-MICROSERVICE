import React, { Suspense } from 'react';
import './aoo.css';
import { CreatePost, PostList } from '@Components';

const App = () => (
  <div>
    <CreatePost />
    <h2>Post List:</h2>
    <Suspense fallback="fetching">
      <PostList />
    </Suspense>
  </div>
);

export default App;
