import { ApolloServer } from "@apollo/server";
import { materialResolvers } from "@/graphql/server/resolvers/material_resolver";
import { userResolvers } from "@/graphql/server/resolvers/user_resolver";
import { rolResolvers } from "@/graphql/server/resolvers/rol_resolver";
import { movementResolvers } from "@/graphql/server/resolvers/movement_resolver";
import { userTypesDefs } from "@/graphql/server/types/user_typesDefs";
import { rolTypeDefs } from "@/graphql/server/types/rol_typesDefs";
import { movementTypeDefs } from "@/graphql/server/types/movement_typesDefs";
import { materialTypeDefs } from "@/graphql/server/types/material_typesDefs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

const server = new ApolloServer({
  resolvers: [
    userResolvers,
    rolResolvers,
    materialResolvers,
    movementResolvers,
  ],
  typeDefs: [userTypesDefs, rolTypeDefs, materialTypeDefs, movementTypeDefs],
});

const serverHandler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => ({
    req,
    res,
    db: prisma,
  }),
});

const graphqlServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (process.env.NODE_ENV === "production" && !session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  return serverHandler(req, res);
};

export default graphqlServer;
