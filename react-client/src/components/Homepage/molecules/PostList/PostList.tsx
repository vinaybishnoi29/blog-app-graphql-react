import React from "react";
import './PostList.css';
import PostItem from "../PostItem";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { Post } from '../../../../global/atoms/Post';
import { POST_LIST_HEADING, CREATE_POST_BUTTON_LABEL } from "../../../../global/constants";

interface PostListProps {
    posts:Post[]
    editPost: (id:string) => void
    deletePost: (id:string) => void
    addPost: () => void
    loading: boolean
}
/**
 * @param PostListProps Props containing posts, editPost function and deletePost function
 * @returns <PostListItem>
 */
const getPostList = ({posts, editPost, deletePost, loading}: PostListProps) => {
  if (!posts.length && !loading) {
    return (
      <Alert color="info">
        No posts to show!!!
      </Alert>
    );
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
              color="primary"
              className='btn_primary' 
              title='Add new post'
              onClick={props.addPost}
            >
              {CREATE_POST_BUTTON_LABEL}
            </Button>
          </Col>
      </Row>
      <Row>
        <Col className='PostList_Item'>
          {getPostList(props)}
        </Col>
      </Row>
    </Container>
  );
};
export default PostList;