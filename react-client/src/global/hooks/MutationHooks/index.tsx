import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_POSTS,
  FETCH_POSTS,
  ADD_POST,
  UPDATE_POST,
} from "../../gqlQueries";
import { useHistory } from "react-router-dom";
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
 * @description This contains use post mutation hook
 * @returns deletePost
 * @returns createPost
 * @returns updatePost
 */
export const usePostMutation = () => {
  const history = useHistory();

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
    awaitRefetchQueries: true,
    refetchQueries:[
      {query: FETCH_POSTS}
    ],
  });

  return {
    deletePost: (id: string) => deletePost({ variables: { id } }),
    createPost: (title: string, content: string) => createPost({ variables: { title, content } }),
    updatePost: (id: string, title: string, content: string) => updatePost({ variables: { id, title, content } }),
  };
};