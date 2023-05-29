import { Resolver } from '@/types';

const movementResolvers: Resolver = {
    Movement:{
        creation_date : async(parent,args,context)=>{
            return new Date(parent.creation_date).toLocaleDateString("en-GB");
        }
    },
  Query: {
    movements: async (parent, args, context) => {
        const whereClause = args.idMaterial ? { material_id: args.idMaterial } : {};
        const movements = await context.db.movement.findMany({
            include:{
                material:true
            },
            where:whereClause
          });
          return movements.map((movement) => ({
            ...movement,
            creation_date: new Date(movement.creation_date).toLocaleDateString("en-GB"),
          }));

    },
    movement: async (parent, args, context) => {
      const movement = await context.db.movement.findUnique({
        where: {
          id: args.id,
        },
        include:{
            material:true
        }
      });
      if (movement) {
        return {
          ...movement,
          creation_date: movement.creation_date.toLocaleDateString("en-GB"),
        };
      }
      return null;
    },
  },
  Mutation: {
    createMovement: async (parent, args, context) => {
      const { quantity, creation_date, movement_type, material_id } = args;
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
      return {...newMovement,creation_date: newMovement.creation_date.toLocaleDateString("en-GB")};
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
  }
};

export { movementResolvers };
