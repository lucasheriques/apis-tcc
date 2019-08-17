const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => "This is a project",
    teachers: (root, args, context, info) => {
      return context.prisma.teachers();
    }
  },
  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createTeacher({
        name: args.name,
        disciplines: args.disciplines
      });
    },
    updateTeacher: (parent, args) => {
      toReturn = {};
      teachers = teachers.map(teacher => {
        if (teacher.id == args.id) {
          teacher.name = args.name ? args.name : teacher.name;
          teacher.disciplines = args.disciplines
            ? args.disciplines
            : teacher.disciplines;
          toReturn = teacher;
        }
      });
      return toReturn;
    },
    deleteTeacher: (parent, args) => {
      oldTeachers = teachers;
      teachers = teachers.filter(teacher => teacher.id != args.id);
      return oldTeachers.filter(teacher => teacher.id == args.id)[0];
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
