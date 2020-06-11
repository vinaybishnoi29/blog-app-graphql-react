import {client} from '../App';
import {gql} from 'apollo-boost';
  
export const fetchPost = async (id: string) => {
  const query = gql`
    query getPost($id: ID!) {
      post(id: $id) {
        id
        title
        content
      }
    }
  `;
  const variables = { id };
  const {
    data: { post },
  } = await client.query({ query, variables });
  return post;
};

export const fetchPostId = async () => {
  const query =  gql`
  {
    postId @client
  }
  `;
  const {
    data: { postId },
  } = await client.query({ query });
  return postId;
}