import { Resolver } from "@/types";

const movementResolvers: Resolver = {
  Movement: {
    creation_date: async (parent, args, context) =>
      new Date(parent.creation_date).toLocaleDateString("en-GB"),
  },
  Query: {
    movements: async (parent, args, context) => {
      const whereClause = args.idMaterial
        ? { material_id: args.idMaterial }
        : {};
      const movements = await context.db.movement.findMany({
        include: {
          material: true,
        },
        where: whereClause,
      });
      return movements;
    },
    movement: async (parent, args, context) => {
      const movement = await context.db.movement.findUnique({
        where: {
          id: args.id,
        },
        include: {
          material: true,
        },
      });
      return movement;
    },
  },
  Mutation: {
    createMovement: async (parent, args, context) => {
      const { quantity, creation_date, movement_type, material_id } = args;
      let factor = 1;
      const newMovement = await context.db.movement.create({
        data: {
          quantity,
          creation_date,
          movement_type,
          material: {
            connect: { id: material_id },
          },
        },
      });
      const currentMaterial = await context.db.material.findUnique({
        where: { id: material_id },
      });
      if (movement_type == "SALIDA") {
        factor = -1;
      }
      context.db.material.update({
        where: { id: material_id },
        data: {
          available: currentMaterial?.available! + quantity * factor,
        },
      });
      return newMovement;
    },
    updateMovement: async (parent, args, context) => {
      const { id, quantity, creation_date, movement_type, material_id } = args;
      const updatedMovement = await context.db.movement.update({
        where: { id },
        data: {
          quantity,
          creation_date,
          movement_type,
          material: {
            connect: { id: material_id },
          },
        },
      });
      return updatedMovement;
    },
    deleteMovement: async (parent, args, context) => {
      const deletedMovement = await context.db.movement.delete({
        where: { id: args.id },
      });
      return deletedMovement;
    },
  },
};

export { movementResolvers };
