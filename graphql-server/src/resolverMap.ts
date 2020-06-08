import { ID, Post } from './models';
import { IResolvers } from 'graphql-tools';
import getFirebase from './firebase';

const Query = {
    posts: (): Post[] => {
        let posts = null;
    
        // Read posts
        posts = getFirebase()
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
    
      post: (_:void, args: ID): Post => {
        console.log(args);
        const {id} = args;
        let current: Post = {
            id: "",
            title: "",
            content: ""
        };
        // Read posts
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
    createPost: (_:void, args: any): Post => {
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
    
    updatePost: (_:void, args:Post): Post => {
    const {id, title, content} = args;
    const newPost: Post = {
        id,
        title,
        content
    }

    var updates: any = {};
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

    deletePost: async (_:void, args:ID) => {
    const {id} = args;
    // var updates = {};
    // updates[`/posts/${id}`] = null;
        getFirebase()
        .database()
        .ref(`/posts/${id}`)
        .remove();
    return 'record del';
    }
};

const resolverMap: IResolvers = {
    Query,
    Mutation
};

export default resolverMap;