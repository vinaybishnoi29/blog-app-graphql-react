import React from "react";
import {RouteComponentProps} from 'react-router';
import "./PostDetails.css";
import { Container, Row, Col } from "reactstrap";
import { usePostById } from "../../global/hooks";
import BackButton from '../../global/atoms/BackButton';

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
  const { post } = usePostById(postId);
  
  return (
    <Container className="BlogDetail">
      <Row>
        <Col>
          <h2 className="BlogDetail_Title">{post.title}</h2>
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