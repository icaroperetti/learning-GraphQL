import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";

const prisma = new PrismaClient();

// Query: Buscar dados

// Mutation: Criat,alterar ou deletar

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    const users = await prisma.user.findMany();
    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
      },
    });

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("name") name: string) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
      },
    });

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: string) {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  }
}
