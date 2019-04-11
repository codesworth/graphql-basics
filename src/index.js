import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
//type Definitions :: Applcation Schema

//Dummy user Array

//Scaler Types: String, Boolean, Int, Float, ID

//Resolvers:: Set of FUnctions for each action
const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment
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
