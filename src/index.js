import { GraphQLServer } from "graphql-yoga";

//type Definitions :: Applcation Schema

//Scaler Types: String, Boolean, Int, Float, ID
const typedefs = `
    type Query{
      greeting(name: String): String!
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

    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello There ${args.name}`;
      }
      return "Hello";
    }
  }
};

const server = new GraphQLServer({ typeDefs: typedefs, resolvers: resolvers });
server.start(() => {
  console.log("GraphQL Server is Live");
});
