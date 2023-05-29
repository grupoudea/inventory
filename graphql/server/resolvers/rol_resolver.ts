
import { Resolver } from '@/types';

const rolResolvers: Resolver = {
  Query: {
    roles: async (parent,args,context) => {
      const roles = await context.db.rol.findMany();
      return roles;
    },
    rol: async (parent,args,context) => {
      const role = await context.db.rol.findUnique({ 
        where: { 
            id: args.id
         } 
    });
      return role;
    },
  },
  Mutation: {
    createRole: async (parent,args,context) => {
      const newRole = await context.db.rol.create({ data:{name:args.name}   });
      return newRole;
    },
    updateRole: async (parent,args,context) => {
      const updatedRole = await context.db.rol.update({
        where: { id:args.id },
        data: {name: args.name} ,
      });
      return updatedRole;
    },
    deleteRole: async (parent,args,context) => {
      const deletedRole = await context.db.rol.delete({ where: { id:args.id } });
      return deletedRole;
    },
  },
  Rol: {
    users: async (parent,args,context) => {
      const users = await context.db.user.findMany({
        where: { rol_id: parent.id },
      });
      return users;
    },
  },
};

export { rolResolvers };