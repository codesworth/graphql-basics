import uuidv4 from "uuid/v4";

const Mutation = {
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
};

export { Mutation as default };
