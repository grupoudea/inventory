import { Resolver } from "@/types";

const userResolvers: Resolver = {
  User: {
    creation_date: async (parent, args, context) =>
      new Date(parent.creation_date).toLocaleDateString("en-GB"),
  },
  Query: {
    users: async (parent, args, context) => {
      const { userId } = args;
      const users = await context.db.user.findMany({
        include: {
          rol: true,
        },
      });

      let currentUser = users.find((x) => x.id == userId);
      if (currentUser && currentUser?.rol?.name == "USER") {
        return null;
      }
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
      const { email, rolId, name } = args;
      const rolUser = await context.db.rol.findUnique({
        where: {
          id: rolId,
        },
      });
      if (rolUser?.name == "USER") {
        throw new Error("Rol user no puede crear usuarios");
      }
      const newUser = await context.db.user.create({
        data: {
          name,
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
      const rolUser = await context.db.rol.findUnique({
        where: {
          id: rolId,
        },
      });
      if (rolUser?.name == "USER") {
        throw new Error("Rol user no puede editar usuarios");
      }
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
