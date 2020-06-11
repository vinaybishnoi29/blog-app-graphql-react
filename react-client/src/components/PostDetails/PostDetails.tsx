import React from "react";
import {RouteComponentProps} from 'react-router';
import "./PostDetails.css";
import { Container, Row, Col, Alert } from "reactstrap";
import {usePostById} from '../../global/hooks/QueryHooks';
import {BackButton, Loader} from '../../global/atoms';

interface MatchParams {
  postId: string;
}

interface PostDetailProps extends RouteComponentProps<MatchParams> {
}
/**
 * Post Detail displays single Component
 * Props contains postId extracted from react router params.
 */
const PostDetails: React.FC<PostDetailProps> = (props: PostDetailProps) => {
  const { postId } = props.match.params;
  const { post, loading, error } = usePostById(postId);

  if(loading) {
    return (
      <Loader loading={loading}/>
    )
  }
  if(error) {
    return (
      <Alert color="danger" className="error_alert">
        Some error occurred!!!
      </Alert>
    )
  }
  return (
    <Container className="BlogDetail">
      <Row>
        <Col>
          <h1 className="BlogDetail_Title">{post.title}</h1>
          <p className="BlogDetail_Content">{post.content}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <BackButton/>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetails;