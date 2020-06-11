import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  DELETE_POSTS,
  FETCH_POSTS,
  ADD_POST,
  UPDATE_POST,
  FETCH_POST,
} from "../gqlQueries";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Post } from "../atoms/Post"

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
 * This contains use post hook
 * @returns posts
 * @returns deletePost
 * @returns createPost
 * @returns updatePost
 */
export const usePost = () => {
  const history = useHistory();
  let { loading, data, refetch } = useQuery<Posts>(FETCH_POSTS, {
    onCompleted:()=>console.log("Get posts hook called"),
    onError: (error) => console.log("Get posts",error),
  });

  // Add the correct return type
  const [deletePost] = useMutation<Status, PostVar>(DELETE_POSTS, {
    update: (cache, { data }) => {
      // read data from cache for this query
      const cacheData: any = cache.readQuery({ query: FETCH_POSTS })
      // write data back to the cache
      cache.writeQuery({
        query: FETCH_POSTS,
        // @ts-ignore: Object is possibly 'null'.
        data: { posts: cacheData.posts.filter((post: Post) => post.id !== data.deletePost.id)}
      });
    },
    onError: (error) => console.log(error),
  });

  // Add the correct return type
  const [createPost] = useMutation(ADD_POST, {
    update: (cache, { data: { post } }) => {
      // read data from cache for this query
      const cacheData: any = cache.readQuery({ query: FETCH_POSTS })

      // write data back to the cache
      cache.writeQuery({ 
        query: FETCH_POSTS, 
        data: {posts: cacheData.posts.concat(post)}
      })
    },
    onCompleted: () => {
      history.push("/");
    },
    onError: (error) => console.log(error),
  });

  // Need to mention types <SinglePost, Post>
  const [updatePost] = useMutation<Post>(UPDATE_POST, {
    onCompleted: () => {
      history.push("/");
    },
    refetchQueries:[
      {query: FETCH_POSTS}
    ],
  });

  const posts = data ? data.posts : [];

  return {
    posts,
    loading,
    deletePost: (id: string) => deletePost({ variables: { id } }),
    createPost: (title: string, content: string) => createPost({ variables: { title, content } }),
    updatePost: (id: string, title: string, content: string) => updatePost({ variables: { id, title, content } }),
  };
};

/**
 * @description This contains use post by id hook
 * @param id of type string
 * @returns post
 */
export const usePostById = (id:string) => {
  const { data: data_post } = useQuery<SinglePost, PostVar>(FETCH_POST, {
    variables: { id },
    onCompleted:()=>console.log("Get post hook called",id),
    onError: (error) => console.log("Get post error",error),
  });
  const post = data_post ? data_post.post : new Post((id = ""), "", "");
  return {
    post
  }
}