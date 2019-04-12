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

    db.comments = db.comments.filter(comment => {
      comment.commentor !== args.id;
    });

    return user[0];
  },

  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find(x => x.id === id);

    if (!user) {
      throw new Error("User Not Found");
    }

    if (typeof data.email === "string") {
      const emailtaken = db.users.some(x => x.email === data.email);

      if (emailtaken) {
        throw new Error("Email already in use");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
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

  updatePost(parent, { id, data }, { db }, info) {
    const { title, body, published } = data;
    const post = db.posts.find(x => x.id === id);

    if (!post) {
      throw new Error("Post does not exist");
    }

    if (typeof title === "string") {
      post.title = title;
    }

    if (typeof body === "string") {
      post.body = body;
    }

    if (typeof published === "boolean") {
      post.published = published;
    }

    return post;
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
  },

  updateComment(parent, { id, data }, { db }, info) {
    const comment = db.comments.find(x => x.id === id);
    if (!comment) {
      throw new Error("Comments do not Exist");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    return comment;
  }
};

export { Mutation as default };
