import { Resolver } from "@/types";

const materialResolvers: Resolver = {
  Material: {
    creation_date: async (parent, args, context) =>
      new Date(parent.creation_date).toLocaleDateString("en-GB"),
  },
  Query: {
    materials: async (parent, args, context) => {
      const whereClause = args.idUser ? { user_id: args.idUser } : {};
      const materials = await context.db.material.findMany({
        where: whereClause,
      });
      return materials;
    },
    material: async (parent, args, context) => {
      const material = await context.db.material.findUnique({
        where: { id: args.id },
      });
      return material;
    },
  },
  Mutation: {
    createMaterial: async (parent, args, context) => {
      const { name, available, user_id } = args;
      const newMaterial = await context.db.material.create({
        data: {
          name,
          available,
          user: { connect: { id: user_id } },
        },
      });
      return newMaterial;
    },
    updateMaterial: async (parent, args, context) => {
      const { id, name, available, user_id } = args;
      const updatedMaterial = await context.db.material.update({
        where: { id },
        data: {
          name,
          available,
          user: { connect: { id: user_id } },
        },
      });
      return updatedMaterial;
    },
    deleteMaterial: async (parent, args, context) => {
      const deletedMaterial = await context.db.material.delete({
        where: { id: args.id },
      });
      return deletedMaterial;
    },
  },
};

export { materialResolvers };
