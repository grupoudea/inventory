import { Resolver } from "../../types";

const resolvers : Resolver = {

    Query:{
        users : async (parent,args,context) =>{
            const users = await context.db.user.findMany();
            return users;
        },
        user : async (parent , args , context)=>{
            const user = await context.db.user.findFirst({
                where:{
                    email:{
                        equals:args.email
                    }
                }
            })
            return user; 

        }
    },
    Mutation:{
        createUser:async (parent,args,context)=>{
            const {email,password} = args;
            const {db}=context;
            const newUser = await db.user.create({
                data:{
                    email,
                    password,
                    rol_id:1
                }
            })
            return newUser;
        }
    }
}

export {resolvers}