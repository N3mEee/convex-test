import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGame = mutation({
    args: { name: v.string(), owner: v.id("users"), status: v.string(), players: v.array(v.id("users")) },
    handler: async (ctx, { name, owner, status, players }) => {
        await ctx.db.insert("games", { name, owner, status, players });
    },
});

export const joinGame = mutation({
    args: { gameId: v.id("games"), players: v.array(v.id("users")) },
    handler: async (ctx, { gameId, players }) => {
        await ctx.db.patch(gameId, { players: players })
    },
});

export const addUser = mutation({
    args: { username: v.string() },
    handler: async (ctx, { username }) => {
        await ctx.db.insert("users", { username });
    },
});

export const currentUser = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").collect();
        const user = users.filter(user => user.username === args.username)[0]
        return user;
    },
});

export const userById = query({
    args: { usersIds: v.array(v.id("users")) },
    handler: async (ctx, { usersIds }) => {
        const users = await ctx.db.query("users").collect();
        const gameUsers = users.filter(user => usersIds.some((userId) => userId === user._id))
        return gameUsers;
    },
});

export const gamesList = query({
    args: {},
    handler: async (ctx) => {
        const games = await ctx.db.query("games").collect();
        return games;
    },
});

export const gameById = query({
    args: { gameId: v.id("games") },
    handler: async (ctx, args) => {
        const game = await ctx.db.get(args.gameId);
        return game;
    },
});