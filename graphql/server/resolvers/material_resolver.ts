import { Resolver } from '../../../types';

const materialResolvers: Resolver = {
    Query: {
        materials: async (parent, args, context) => {
            const whereClause = args.idUser ? { user_id: args.idUser } : {};
            const materials = await context.db.material.findMany({
                where:whereClause
            });
            return materials.map((material) => ({
                ...material,
                creation_date: new Date(material.creation_date).toLocaleDateString("en-GB"),
            }));
        },
        material: async (parent, args, context) => {
            const material = await context.db.material.findUnique({
                where: { id: args.id },
            });
            if (material) {
                return {
                    ...material,
                    creation_date: new Date(material.creation_date).toLocaleDateString("en-GB"),
                };
            }
            return null;
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
            const { id, name, available, creation_date, user_id } = args;
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