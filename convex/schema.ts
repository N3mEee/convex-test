import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    users: defineTable({
        username: v.string(),
    }),

    games: defineTable({
        name: v.string(),
        owner: v.id("users"),
        status: v.string(),
        players: v.array(v.id("users"))
    }),
});