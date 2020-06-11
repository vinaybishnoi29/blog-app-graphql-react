import { gql } from "apollo-boost";

export const FETCH_POSTS = gql`
  query FetchPosts {
    posts {
      id
      title
      content
    }
  }
`;
export const DELETE_POSTS = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      status
    }
  }
`;
export const ADD_POST = gql`
  mutation CreatePost($title: String, $content: String) {
    post: createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    post: updatePost(id: $id, title: $title, content: $content) {
      title
      content
    }
  }
`;
export const FETCH_POST = gql`
query fetchPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
  }
}
`;