import { ApolloServer } from '@apollo/server';

import { resolvers } from '@/graphql/server/user_resolver';
import { typeDefs } from '@/graphql/server/types';
import {startServerAndCreateNextHandler} from '@as-integrations/next'

import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();



const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server,{
  context:async(req:NextApiRequest,res:NextApiResponse)=>({
    req,
    res,
    db:prisma
  })
});