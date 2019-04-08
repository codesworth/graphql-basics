import { GraphQLServer } from "graphql-yoga";

//type Definitions :: Applcation Schema
const typedefs = `
    type Query{
        hello: String!
        name:String!
        bio:String
    }
`;

//Resolvers:: Set of FUnctions for each action
const resolvers = {
  Query: {
    hello() {
      return "First query!";
    },

    name() {
      return "jeremie Njitap";
    },
    bio() {
      return null;
    }
  }
};

const server = new GraphQLServer({ typeDefs: typedefs, resolvers: resolvers });
server.start(() => {
  console.log("GraphQL Server is Live");
});
