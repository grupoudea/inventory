import { Resolver } from "@/types";

const userResolvers: Resolver = {
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
      const { email, password, rolId } = args;
      const newUser = await context.db.user.create({
        data: {
          email,
          password,
          rol: {
            connect: { id: rolId },
          },
        },
      });
      return newUser;
    },
    updateUser: async (parent, args, context) => {
      const { id, email, password, rolId } = args;
      const updatedUser = await context.db.user.update({
        where: { id },
        data: {
          email,
          password,
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
