const Post = {
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
};

export { Post as default };
