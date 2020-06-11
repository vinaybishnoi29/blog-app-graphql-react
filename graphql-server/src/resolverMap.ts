import { ID, Post, Status } from './models';
import { IResolvers } from 'graphql-tools';
import getFirebase from './firebase';

const Query = {
    /**
     * @description Gets all the posts
     * 
     * @return {Post[]} Returns Array of Posts
    */
    posts: (): Post[] => {
        let posts: Post[] = getFirebase()
            .database()
            .ref("/posts")
            .once("value")
            .then((snapshot: any) => {
                let posts = [];
                const snapshotVal = snapshot.val();
                let current: Post = {
                    id: "",
                    title: "",
                    content: ""
                };
                for (let slug in snapshotVal) {
                current = snapshotVal[slug];
                current.id = slug
                posts.push(current);
                }
                return posts;
            });
        return posts;
      },
    
    /**
     * @description Gets a post based on ID
     * 
     * @param {void} _ - Blank
     * @param {ID} args - Id of the post to be fetched
     * @return {Post} Returns a Post
    */
    post: (_:void, args: ID): Post => {
    const {id} = args;
    let current: Post = {
        id: "",
        title: "",
        content: ""
    };
    let post = getFirebase()
        .database()
        .ref("/posts")
        .once("value")
        .then((snapshot: any) => {
            const snapshotVal = snapshot.val();
            current = snapshotVal[id];
            current.id = id;
            return current;
        });
    return post;
    }
};

const Mutation = {
    /**
     * @description Creates a new post
     * 
     * @param {void} _ - Blank
     * @param {Post} args - Input arguments for post creation
     * @return {Post} Returns newly created post
     *
    */
    createPost: (_:void, args: Post): Post => {
        const {title, content} = args;
    
        // Get a key for a new Post.
        var newPostKey = getFirebase().database().ref().child('posts').push().key;
        var updates: any = {
        };
        const newPost: Post = {
            id: newPostKey,
            title,
            content
          }
        updates[`/posts/${newPostKey}`] = newPost;
        let response = getFirebase()
                  .database()
                  .ref()
                  .update(updates)
                  .then((response: any) => {
                    return response;
                  });

        return newPost;
      },
    
    /**
     * @description Updates an existing post
     * 
     * @param {void} _ - Blank
     * @param {Post} args - Input arguments for post creation
     * @return {Post} Returns updated post
     *
    */
    updatePost: (_:void, args:Post): Post => {
    const {id, title, content} = args;
    const newPost: Post = {
        id,
        title,
        content
    }

    let updates: any = {};
    updates[`/posts/${id}`] = newPost;
    let resp = getFirebase()
                .database()
                .ref()
                .update(updates)
                .then((response: any) => {
                return response;
                });
    return newPost;
    },

    /**
     * @description Deletes an existing post based on id
     * 
     * @param {void} _ - Blank
     * @param {ID} args - Id of the post to be deleted
     * @return {string} Returns deletion status
     *
    */
    deletePost: (_:void, args:ID): Status => {
      const {id} = args;
        getFirebase()
        .database()
        .ref(`/posts/${id}`)
        .remove();
      return {
        id: id,
        status: 'Deleted'
      };
    }
};

const resolverMap: IResolvers = {
    Query,
    Mutation
};

export default resolverMap;