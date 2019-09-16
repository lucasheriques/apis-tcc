import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { Context } from "./utils";

let teachersDetails = {
  "1": {
    id: "1",
    name: "Lesandro Ponciano",
    disciplines: "Interação Humano Computador",
    description: "Ótimo professor e orientador!",
    university: "PUC Minas",
    birthday: "22/01/1985"
  },
  "2": {
    id: "2",
    name: "Maria Augusta",
    disciplines: "Interação Humano Computador",
    description: "Ótimo professor e orientador!",
    university: "PUC Minas",
    birthday: "22/01/1985"
  },
  "3": {
    id: "3",
    name: "Marcelo Werneck",
    disciplines: "Interação Humano Computador",
    description: "Ótimo professor e orientador!",
    university: "PUC Minas",
    birthday: "22/01/1985"
  }
};

const resolvers = {
  Query: {
    teachers(parent, args, context: Context) {
      return Object.values(teachersDetails);
    },
    teacher(parent, { id }, context: Context) {
      return teachersDetails[id];
    }
  },
  Mutation: {
    createTeacher(
      parent,
      { name, disciplines, description, university, birthday },
      context: Context
    ) {
      return context.prisma.createTeacher({
        name,
        disciplines,
        description,
        university,
        birthday
      });
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
  typeDefs: "./api/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start({ endpoint: "/graphql/", playground: "/graphql/" }, () =>
  console.log("Server is running on http://localhost:4000/graphql")
);
