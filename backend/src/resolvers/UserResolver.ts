import crypto from "crypto";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";

// Query: Buscar dados

// Mutation: Criat,alterar ou deletar

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    return this.data;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = { id: crypto.randomUUID(), name };

    this.data.push(user);

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("name") name: string) {
    const user = this.data.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: string) {
    const user = this.data.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    this.data = this.data.filter((user) => user.id !== id);

    return user;
  }
}
