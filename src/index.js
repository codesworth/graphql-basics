import { GraphQLServer } from "graphql-yoga";

//type Definitions :: Applcation Schema

//Dummy user Array
const users = [
  {
    id: "asj0saa-sdass",
    name: "Lord lyton",
    age: 409,
    email: "lorad@gmail.com"
  },
  {
    id: "asj0saa-sdane",
    name: "Lord Caron",
    age: 49,
    email: "caron@gmail.com"
  },
  {
    id: "asdwplso0saa-sdass",
    name: "Khal Pono",
    age: 50,
    email: "kpono@gmail.com"
  }
];

const posts = [
  {
    id: "Sjkjs-dsnnsd",
    title: "GrapphQL",
    poster: users[0].id,
    published: false,
    body:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores consectetur eveniet sunt quia officiis aperiam, blanditiis quaerat repellat ex inventore aliquid beatae ipsa saepe vero vel soluta! Repudiandae, voluptas ex!"
  },
  {
    id: "-wgets-dsnnsd",
    title: "Redux Materilas",
    poster: users[0].id,
    published: true,
    body:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores consectetur eveniet sunt quia officiis aperiam, blanditiis quaerat repellat ex inventore aliquid beatae ipsa saepe vero vel soluta! Repudiandae, voluptas ex!"
  },
  {
    id: "Sjkjs-d0923d",
    poster: users[2].id,
    title: "MetalGPX",
    published: true,
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe consequuntur voluptatum fugiat nesciunt ducimus sequi itaque et optio debitis doloribus, aperiam ratione dolorum! Quasi quo incidunt dolores deleniti tempore error?"
  }
];

var comments = [
  {
    id: "jxy-234yx",
    commentor: users[0].id,
    post: posts[0].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eligendi inventore debitis ex sed ratione nostrum enim ut possimus, unde excepturi minus praesentium optio exercitationem libero, cum molestiae? Ex, quia."
  },
  {
    id: "jxy-234yx",
    commentor: users[1].id,
    post: posts[0].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo sapiente culpa repellat dolore nam. Alias expedita rerum est dolores recusandae labore corporis quod, corrupti blanditiis minus sapiente saepe, a totam."
  },
  {
    id: "jxy-234yx",
    commentor: users[1].id,
    post: posts[1].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit obcaecati dolores esse repudiandae suscipit? Ipsum vel quo modi maxime illum, velit beatae accusantium, consectetur vero tempora sint numquam voluptatem explicabo."
  },
  {
    id: "jxy-234yx",
    post: posts[2].id,
    commentor: users[2].id,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ut voluptas, illo molestias nam accusamus earum voluptate neque optio similique expedita officiis modi atque ullam dolor labore totam sint? Quibusdam!"
  }
];

//Scaler Types: String, Boolean, Int, Float, ID
const typedefs = `

    type Mutation{
      createUser(name:String!,email:String!, age:Int):User!
    }

    type Query{
      users(query:String):[User!]!
      me: User!
      posts:[Post!]!
      comments:[Comment!]!
    }

    type User{
      id: ID
      name: String!
      email:String!
      age: Int
      posts:[Post!]!
      comments:[Comment]
    }

    type Comment{
      id:ID!
      text:String!,
      commentor:User!,
      post:Post!
    }

    type Post{
      id: ID!
      published: Boolean
      title: String
      body:String,
      poster:User!
      comments:[Comment!]!
    }
`;

//Resolvers:: Set of FUnctions for each action
const resolvers = {
  Mutation: {
    createUser(parent, args, ctx, info) {
      console.log(args);
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
    comments() {
      return comments;
    },

    posts() {
      return posts;
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(x => {
        return x.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  Post: {
    poster(parent, args, ctx, info) {
      return users.find(x => {
        return x.id === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(x => {
        return x.post === parent.id;
      });
    }
  },

  Comment: {
    commentor(parent, args, ctx, info) {
      return users.find(x => {
        return x.id === parent.commentor;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(x => {
        return (x.id = parent.post);
      });
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(x => {
        return x.poster === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(x => {
        return x.commentor === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({ typeDefs: typedefs, resolvers: resolvers });
server.start(() => {
  console.log("GraphQL Server is Live");
});
