import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { Context } from "./utils";

const resolvers = {
  Query: {
    teachers(parent, args, context: Context) {
      return context.prisma.teachers();
    }
  },
  Mutation: {
    createTeacher(parent, { name, disciplines }, context: Context) {
      return context.prisma.createTeacher({ name, disciplines });
    },
    deleteTeacher(parent, { id }, context: Context) {
      return context.prisma.deleteTeacher({ id });
    },
    updateTeacher(parent, { id, name, disciplines }, context: Context) {
      return context.prisma.updateTeacher({
        where: { id },
        data: { name, disciplines }
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log("Server is running on http://localhost:4000"));
