import { useQuery } from "@apollo/react-hooks";
import {
  FETCH_POSTS,
  FETCH_POST,
} from "../../gqlQueries";
import { Post } from "../../atoms/Post"

interface Input {
  title: string;
  description: string;
}
interface InputData {
  input: Input;
}
interface PostVar {
  id: string | undefined;
}
interface Status {
  id: string;
  status: string;
}
interface Posts {
  posts: Post[];
}
interface SinglePost {
  post: Post;
}
// interface data {
//   post: SinglePost
// }
// interface CreateData {
//   data: data
// }

/**
 * @description This is a custom hook that returns all posts
 * @returns posts
 */
export const usePosts = () => {
  let { loading, data, error } = useQuery<Posts>(FETCH_POSTS, {
    onCompleted:()=>console.log("Get posts hook called"),
    onError: (error) => console.log("Get posts",error),
  });

  const posts = data ? data.posts : [];

  return {
    posts,
    loading,
    error
  };
};

/**
 * @description This is a custom hook that returns post for the given id
 * @param id of type string
 * @returns post
 */
export const usePostById = (id:string) => {
  const { data: data_post, loading, error } = useQuery<SinglePost, PostVar>(FETCH_POST, {
    variables: { id },
    onCompleted:()=>console.log("Get post hook called",id),
    onError: (error) => console.log("Get post error",error),
  });
  const post = data_post ? data_post.post : new Post((id = ""), "", "");
  return {
    post,
    loading,
    error
  }
}