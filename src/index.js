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

//Scaler Types: String, Boolean, Int, Float, ID
const typedefs = `
    type Query{
      users(query:String):[User!]!
      me: User!
      post:Post!
      
    }

    type User{
      id: ID
      name: String!
      email:String!
      age: Int
    }

    type Post{
      id: ID!
      published: Boolean
      title: String
      body:String
    }
`;

//Resolvers:: Set of FUnctions for each action
const resolvers = {
  Query: {
    me() {
      return {
        id: "msnsmdnkdksdm",
        name: "Jerry Poona",
        age: 45,
        email: "Addon Save"
      };
    },

    post() {
      return {
        id: "Sjkjs-dsnnsd",
        title: "GrapphQL",
        published: false,
        body:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores consectetur eveniet sunt quia officiis aperiam, blanditiis quaerat repellat ex inventore aliquid beatae ipsa saepe vero vel soluta! Repudiandae, voluptas ex!"
      };
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(x => {
        return x.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  }
};

const server = new GraphQLServer({ typeDefs: typedefs, resolvers: resolvers });
server.start(() => {
  console.log("GraphQL Server is Live");
});
