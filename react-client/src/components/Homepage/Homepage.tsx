import React from "react";
import PostList from "./molecules/PostList";
import { useHistory } from "react-router-dom";

/**
 * Homepage displays {@linkcode PostList} PostList Component
 */
const Homepage: React.FC = () => {
  const history = useHistory();

  /**
 * Navigates to edit post page for input id.
 * @param id of the post.
 */
  const updatePostHandler = (id: string) => {
    history.push(`/post/create/${id}?mode=edit`);
  };

 /**
  * Navigates to Add Post page.
  */
  const addPostHandler = () => {
    history.push('/post/create');
  }

  return (
    <div>
      <PostList
        editPost={updatePostHandler}
        addPost={addPostHandler}
      />
    </div>
  );
};

export default Homepage;