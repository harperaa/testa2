import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { paymentAttemptSchemaValidator } from "./paymentAttemptTypes";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
      // Primary email from Clerk
      email: v.optional(v.string()),
    })
      .index("byExternalId", ["externalId"])
      .index("byEmail", ["email"]),

    paymentAttempts: defineTable(paymentAttemptSchemaValidator)
      .index("byPaymentId", ["payment_id"])
      .index("byUserId", ["userId"])
      .index("byPayerUserId", ["payer.user_id"]),

    // Grok Fit — per-user fitness goals and energy targets
    fitnessProfiles: defineTable({
      userId: v.id("users"),
      goalType: v.union(
        v.literal("fat_loss"),
        v.literal("muscle_gain"),
        v.literal("maintenance")
      ),
      goalTitle: v.string(),
      dailyCalorieTarget: v.number(),
      bmr: v.number(),
      startWeightKg: v.number(),
      currentWeightKg: v.number(),
      targetWeightKg: v.number(),
      streakDays: v.number(),
      lastLogDate: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("byUserId", ["userId"]),

    // Meals (calories in) and workouts (calories out)
    fitnessEntries: defineTable({
      userId: v.id("users"),
      date: v.string(), // YYYY-MM-DD (local day from client)
      kind: v.union(v.literal("meal"), v.literal("workout")),
      category: v.string(),
      name: v.string(),
      calories: v.number(),
      time: v.string(), // HH:mm
      status: v.union(v.literal("logged"), v.literal("pending")),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byUserDate", ["userId", "date"])
      .index("byUser", ["userId"]),

    // Security monitoring table
    // userId is optional to allow logging violations from unauthenticated requests
    securityEvents: defineTable({
      userId: v.optional(v.id("users")),
      eventType: v.union(
        v.literal("origin_mismatch"),
        v.literal("rate_limit_exceeded"),
        v.literal("invalid_api_key"),
        v.literal("fingerprint_change"),
        v.literal("suspicious_activity"),
        v.literal("jwt_validation_failed"),
        v.literal("unauthorized_access"),
        v.literal("input_validation_failed"),
        v.literal("replay_detected"),
        v.literal("not_found_enumeration"),
        v.literal("jwt_algorithm_attack"),
        v.literal("tenant_isolation_attack"),
        v.literal("jwt_replay_attack"),
        v.literal("xss_attempt"),
        v.literal("fingerprint_manipulation"),
        v.literal("http_origin_blocked"),
        v.literal("prompt_injection_attempt"),
        v.literal("ai_response_validation_failed"),
        v.literal("csrf_validation_failed")
      ),
      severity: v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("critical")
      ),
      metadata: v.object({
        origin: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
        fingerprint: v.optional(v.string()),
        endpoint: v.optional(v.string()),
        errorMessage: v.optional(v.string()),
        endUserEmail: v.optional(v.string()),
        endUserName: v.optional(v.string()),
        endUserId: v.optional(v.string()),
        actionType: v.optional(v.string()),
        requestPayload: v.optional(v.string()),
      }),
      timestamp: v.number(),
      isRead: v.boolean(),
    })
      .index("byUser", ["userId", "timestamp"])
      .index("bySeverity", ["userId", "severity", "timestamp"])
      .index("byUnread", ["userId", "isRead", "timestamp"]),
  });