import { Resolver } from "@/types";

const userResolvers: Resolver = {
  User: {
    creation_date: async (parent, args, context) =>
      new Date(parent.creation_date).toLocaleDateString("en-GB"),
  },
  Query: {
    users: async (parent, args, context) => {
      const users = await context.db.user.findMany({
        include: {
          rol: true,
        },
      });
      return users;
    },
    user: async (parent, args, context) => {
      const user = await context.db.user.findUnique({
        where: {
          email: args.email,
        },
        include: {
          rol: true,
        },
      });
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const { email, rolId } = args;
      const newUser = await context.db.user.create({
        data: {
          email,
          rol: {
            connect: { id: rolId },
          },
        },
      });
      return newUser;
    },
    updateUser: async (parent, args, context) => {
      const { id, email, rolId } = args;
      const updatedUser = await context.db.user.update({
        where: { id },
        data: {
          email,
          rol: {
            connect: { id: rolId },
          },
        },
      });
      return updatedUser;
    },
    deleteUser: async (parent, args, context) => {
      const deletedUser = await context.db.user.delete({
        where: { id: args.id },
      });
      return deletedUser;
    },
  },
};

export { userResolvers };
