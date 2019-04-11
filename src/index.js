import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";
import db from "./db";
//type Definitions :: Applcation Schema

//Dummy user Array

//Scaler Types: String, Boolean, Int, Float, ID

//Resolvers:: Set of FUnctions for each action
const resolvers = {
  Mutation: {
    createUser(parent, args, { db }, info) {
      console.log(args);
      const emailtaken = db.users.some(x => x.email === args.email);
      if (emailtaken) {
        throw new Error("Email is already taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },

    deleteUser(parent, args, { db }, info) {
      const index = db.users.findIndex(x => x.id === args.id);
      if (index < 0) {
        throw new Error("User does not exist");
      }

      const user = db.users.splice(index, 1);
      db.posts = db.posts.filter(post => {
        const authored = post.poster === args.id;
        if (authored) {
          db.comments = db.comments.filter(comment => {
            return comment.post !== post.id;
          });
        }
        return !authored;
      });

      comments = comments.filter(comment => {
        comment.commentor !== args.id;
      });

      return user[0];
    },

    createPost(parent, args, { db }, info) {
      const userExist = db.users.some(x => x.id === args.data.poster);
      if (!userExist) {
        throw new Error("User Not Founds");
      }

      const newPost = {
        id: uuidv4(),
        ...args.data
      };

      db.posts.push(newPost);

      return newPost;
    },

    createComment(parent, args, { db }, info) {
      const canComment =
        db.users.some(x => x.id === args.data.commentor) &&
        db.posts.some(x => x.id === args.data.post);
      if (!canComment) {
        throw new Error("Cannot Post comment at this time");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      db.comments.push(comment);
      // const index = posts.findIndex(x => x.id === args.post);
      // posts[index].comments.push(comment.id);
      return comment;
    }
  },

  Query: {
    me() {
      return {
        id: "msnsmdnkdksdm",
        name: "Jerry Poona",
        age: 45,
        email: "Addon Save"
      };
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    },

    posts(parent, args, { db }, info) {
      return db.posts;
    },

    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(x => {
        return x.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  Post: {
    poster(parent, args, { db }, info) {
      return users.find(x => {
        return x.id === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(x => {
        return x.post === parent.id;
      });
    }
  },

  Comment: {
    commentor(parent, args, { db }, info) {
      return db.users.find(x => {
        return x.id === parent.commentor;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find(x => {
        return (x.id = parent.post);
      });
    }
  },

  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(x => {
        return x.poster === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(x => {
        return x.commentor === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context: {
    db
  }
});
server.start(() => {
  console.log("GraphQL Server is Live");
});
