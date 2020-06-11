import React from "react";
import './PostList.css';
import PostItem from "../PostItem";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { Post } from '../../../../global/atoms/Post';
import { POST_LIST_HEADING, CREATE_POST_BUTTON_LABEL } from "../../../../global/constants";
import { usePosts, usePostMutation } from '../../../../global/hooks';
import {Loader} from '../../../../global/atoms';

interface PostListProps {
    editPost: (id:string) => void
    addPost: () => void
}

/**
 * @param PostListProps Props containing posts, editPost function and deletePost function
 * @returns <PostListItem>
 */
const getPostList = (editPost: (id:string) => void, posts: Post[], deletePost: (id:string) => void) => {
  if (!posts.length) {
    return null;
  }
  const list = posts.map((post) => {
    return (
      <PostItem
        key={post.id}
        post={post}
        editPost={editPost}
        deletePost={deletePost}
      />
    );
  });
  return list;
};
/**
 * PostBoard displays {@linkcode PostItem} PostItem Component
 * Receives PostListProps
 */
const PostList:React.FC<PostListProps> = (props: PostListProps) => {
  const {posts, loading, error} = usePosts();
  const {deletePost} = usePostMutation();

  let postsContent = null;
  if(loading) {
    postsContent = (
      <Loader loading={loading}/>
    );
  } else if(error) {
    postsContent = (
      <Alert color="danger" className="error_alert">
        Some error occurred!!!
      </Alert>
    );
  } else {
    postsContent = (
      <Row>
        <Col className='PostList_Item'>
          {getPostList(props.editPost, posts, deletePost)}
        </Col>
      </Row>
    );
  }
  
  return (
    <Container className='PostList'>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 5 }}>
          <h1 className="PostList_Heading">{POST_LIST_HEADING}</h1>
        </Col>
      </Row>
      <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}>
            <Button 
              outline
              color="info"
              className='btn_primary' 
              title='Add new post'
              onClick={props.addPost}
            >
              {CREATE_POST_BUTTON_LABEL}
            </Button>
          </Col>
      </Row>
      {postsContent}
    </Container>
  );
};
export default PostList;