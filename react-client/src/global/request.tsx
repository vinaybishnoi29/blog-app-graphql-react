import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloLink,
  } from "apollo-boost";
  import gql from "graphql-tag";
  
  const endpointUrl = "http://localhost:4000/posts";
  const authLink = new ApolloLink((operation, forward) => {
    return forward(operation);
  });
  const client = new ApolloClient({
    link: ApolloLink.from([authLink, new HttpLink({ uri: endpointUrl })]),
    cache: new InMemoryCache(),
  });
  
  export const loadPosts = async () => {
    const query = gql`
      query {
        posts {
          id
          title
          descriptions
        }
      }
    `;
    const { data } = await client.query({ query, fetchPolicy: "no-cache" });
    return data.posts;
  };
  export const loadPost = async (id: string) => {
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
  
  export const deletePost = async (id: string) => {
    const mutation = gql`
      mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
          status
        }
      }
    `;
    const variables = { id };
    const { data } = await client.mutate({ mutation, variables });
    return data;
  };
  export const addPost = async (input: any) => {
    const mutation = gql`
      mutation CreatePost($input: CreatePostInput) {
        post: createPost(input: $input) {
          id
          title
          description
        }
      }
    `;
    const variables = { input };
    const { data } = await client.mutate({ mutation, variables });
    return data;
  };
  export const updatePost = async (
    id: string,
    title: string,
    description: string
  ) => {
    const mutation = gql`
      mutation UpdatePost($id: ID!, $title: String, $description: String) {
        post: updatePost(id: $id, title: $title, description: $description) {
          id
          title
          description
        }
      }
    `;
    const variables = { id,title,description };
    const { data } = await client.mutate({ mutation, variables });
    return data;
  };