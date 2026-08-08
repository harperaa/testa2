import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  getCurrentUser,
  getCurrentUserOrThrowForMutation,
} from "./users";
import { Id } from "./_generated/dataModel";

const goalTypeValidator = v.union(
  v.literal("fat_loss"),
  v.literal("muscle_gain"),
  v.literal("maintenance")
);

const entryKindValidator = v.union(v.literal("meal"), v.literal("workout"));
const statusValidator = v.union(v.literal("logged"), v.literal("pending"));

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function assertDate(date: string) {
  if (!DATE_RE.test(date)) {
    throw new Error("Invalid date. Use YYYY-MM-DD.");
  }
}

function assertTime(time: string) {
  if (!TIME_RE.test(time)) {
    throw new Error("Invalid time. Use HH:mm.");
  }
}

function assertCalories(calories: number) {
  if (!Number.isFinite(calories) || calories < 0 || calories > 20000) {
    throw new Error("Calories must be between 0 and 20,000.");
  }
}

function sanitizeName(name: string) {
  const trimmed = name.trim().slice(0, 120);
  if (trimmed.length < 1) {
    throw new Error("Name is required.");
  }
  return trimmed;
}

function sanitizeCategory(category: string) {
  const trimmed = category.trim().slice(0, 40);
  if (trimmed.length < 1) {
    throw new Error("Category is required.");
  }
  return trimmed;
}

function defaultTargetForGoal(goalType: "fat_loss" | "muscle_gain" | "maintenance") {
  if (goalType === "fat_loss") return 1850;
  if (goalType === "muscle_gain") return 2600;
  return 2200;
}

function dayOffsets(fromDate: string, days: number): string[] {
  const [y, m, d] = fromDate.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  const out: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date(base);
    dt.setUTCDate(base.getUTCDate() - i);
    out.push(dt.toISOString().slice(0, 10));
  }
  return out;
}

async function getProfileForUser(ctx: { db: any }, userId: Id<"users">) {
  return await ctx.db
    .query("fitnessProfiles")
    .withIndex("byUserId", (q: any) => q.eq("userId", userId))
    .unique();
}

async function requireOwnedEntry(ctx: { db: any }, userId: Id<"users">, entryId: Id<"fitnessEntries">) {
  const entry = await ctx.db.get(entryId);
  if (!entry || entry.userId !== userId) {
    throw new Error("Entry not found.");
  }
  return entry;
}

/** Create default profile if missing. Call once after sign-in. */
export const ensureProfile = mutation({
  args: {},
  handler: async (ctx) => {
    // Soft-fail when auth is not ready yet (client should also wait on useConvexAuth)
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return null;
    }

    const user = await getCurrentUserOrThrowForMutation(ctx);
    const existing = await getProfileForUser(ctx, user._id);
    if (existing) return existing._id;

    const now = Date.now();
    return await ctx.db.insert("fitnessProfiles", {
      userId: user._id,
      goalType: "fat_loss",
      goalTitle: "Crushing Q3 Goal",
      dailyCalorieTarget: 1850,
      bmr: 1800,
      startWeightKg: 82.6,
      currentWeightKg: 78.4,
      targetWeightKg: 75,
      streakDays: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;
    return await getProfileForUser(ctx, user._id);
  },
});

export const updateProfile = mutation({
  args: {
    goalType: v.optional(goalTypeValidator),
    goalTitle: v.optional(v.string()),
    dailyCalorieTarget: v.optional(v.number()),
    bmr: v.optional(v.number()),
    startWeightKg: v.optional(v.number()),
    currentWeightKg: v.optional(v.number()),
    targetWeightKg: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrowForMutation(ctx);
    let profile = await getProfileForUser(ctx, user._id);
    const now = Date.now();

    if (!profile) {
      const goalType = args.goalType ?? "fat_loss";
      const id = await ctx.db.insert("fitnessProfiles", {
        userId: user._id,
        goalType,
        goalTitle: (args.goalTitle?.trim() || "My fitness goal").slice(0, 80),
        dailyCalorieTarget:
          args.dailyCalorieTarget ?? defaultTargetForGoal(goalType),
        bmr: args.bmr ?? 1800,
        startWeightKg: args.startWeightKg ?? 80,
        currentWeightKg: args.currentWeightKg ?? 80,
        targetWeightKg: args.targetWeightKg ?? 75,
        streakDays: 0,
        createdAt: now,
        updatedAt: now,
      });
      return id;
    }

    const patch: Record<string, unknown> = { updatedAt: now };
    if (args.goalType !== undefined) {
      patch.goalType = args.goalType;
      if (args.dailyCalorieTarget === undefined) {
        patch.dailyCalorieTarget = defaultTargetForGoal(args.goalType);
      }
    }
    if (args.goalTitle !== undefined) {
      const title = args.goalTitle.trim().slice(0, 80);
      if (!title) throw new Error("Goal title is required.");
      patch.goalTitle = title;
    }
    if (args.dailyCalorieTarget !== undefined) {
      if (args.dailyCalorieTarget < 800 || args.dailyCalorieTarget > 10000) {
        throw new Error("Daily calorie target must be between 800 and 10,000.");
      }
      patch.dailyCalorieTarget = args.dailyCalorieTarget;
    }
    if (args.bmr !== undefined) {
      if (args.bmr < 800 || args.bmr > 5000) {
        throw new Error("BMR must be between 800 and 5,000.");
      }
      patch.bmr = args.bmr;
    }
    for (const key of ["startWeightKg", "currentWeightKg", "targetWeightKg"] as const) {
      const val = args[key];
      if (val !== undefined) {
        if (val < 30 || val > 300) {
          throw new Error("Weight must be between 30 and 300 kg.");
        }
        patch[key] = val;
      }
    }

    await ctx.db.patch(profile._id, patch);
    return profile._id;
  },
});

export const listEntries = query({
  args: {
    date: v.optional(v.string()),
    kind: v.optional(entryKindValidator),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    if (args.date) {
      assertDate(args.date);
      let entries = await ctx.db
        .query("fitnessEntries")
        .withIndex("byUserDate", (q) =>
          q.eq("userId", user._id).eq("date", args.date!)
        )
        .collect();
      if (args.kind) {
        entries = entries.filter((e) => e.kind === args.kind);
      }
      return entries.sort((a, b) => a.time.localeCompare(b.time) || a.createdAt - b.createdAt);
    }

    const all = await ctx.db
      .query("fitnessEntries")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .collect();
    const filtered = args.kind ? all.filter((e) => e.kind === args.kind) : all;
    return filtered
      .sort((a, b) =>
        b.date.localeCompare(a.date) ||
        b.time.localeCompare(a.time) ||
        b.createdAt - a.createdAt
      )
      .slice(0, 200);
  },
});

export const addEntry = mutation({
  args: {
    date: v.string(),
    kind: entryKindValidator,
    category: v.string(),
    name: v.string(),
    calories: v.number(),
    time: v.string(),
    status: v.optional(statusValidator),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrowForMutation(ctx);
    assertDate(args.date);
    assertTime(args.time);
    assertCalories(args.calories);

    const now = Date.now();
    const entryId = await ctx.db.insert("fitnessEntries", {
      userId: user._id,
      date: args.date,
      kind: args.kind,
      category: sanitizeCategory(args.category),
      name: sanitizeName(args.name),
      calories: Math.round(args.calories),
      time: args.time,
      status: args.status ?? "logged",
      createdAt: now,
      updatedAt: now,
    });

    // Streak: consecutive days with at least one logged entry ending today
    const profile = await getProfileForUser(ctx, user._id);
    if (profile) {
      let streak = profile.streakDays;
      if (profile.lastLogDate === args.date) {
        // same day — keep streak
      } else if (profile.lastLogDate) {
        const prev = new Date(profile.lastLogDate + "T00:00:00Z");
        const cur = new Date(args.date + "T00:00:00Z");
        const diffDays = Math.round((cur.getTime() - prev.getTime()) / 86400000);
        streak = diffDays === 1 ? streak + 1 : 1;
      } else {
        streak = 1;
      }
      await ctx.db.patch(profile._id, {
        lastLogDate: args.date,
        streakDays: streak,
        updatedAt: now,
      });
    }

    return entryId;
  },
});

export const updateEntry = mutation({
  args: {
    entryId: v.id("fitnessEntries"),
    category: v.optional(v.string()),
    name: v.optional(v.string()),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    status: v.optional(statusValidator),
    date: v.optional(v.string()),
    kind: v.optional(entryKindValidator),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrowForMutation(ctx);
    await requireOwnedEntry(ctx, user._id, args.entryId);

    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.category !== undefined) patch.category = sanitizeCategory(args.category);
    if (args.name !== undefined) patch.name = sanitizeName(args.name);
    if (args.calories !== undefined) {
      assertCalories(args.calories);
      patch.calories = Math.round(args.calories);
    }
    if (args.time !== undefined) {
      assertTime(args.time);
      patch.time = args.time;
    }
    if (args.status !== undefined) patch.status = args.status;
    if (args.date !== undefined) {
      assertDate(args.date);
      patch.date = args.date;
    }
    if (args.kind !== undefined) patch.kind = args.kind;

    await ctx.db.patch(args.entryId, patch);
    return args.entryId;
  },
});

export const deleteEntry = mutation({
  args: { entryId: v.id("fitnessEntries") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrowForMutation(ctx);
    await requireOwnedEntry(ctx, user._id, args.entryId);
    await ctx.db.delete(args.entryId);
    return true;
  },
});

/** Dashboard aggregates for a given local date (and prior 6 days for the chart). */
export const getDashboard = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;
    assertDate(args.date);

    const profile = await getProfileForUser(ctx, user._id);
    const bmr = profile?.bmr ?? 1800;
    const dailyCalorieTarget = profile?.dailyCalorieTarget ?? 1850;

    const weekDates = dayOffsets(args.date, 7);
    const weekBalances: {
      date: string;
      day: string;
      caloriesIn: number;
      caloriesOut: number;
      balance: number;
    }[] = [];

    let todayMeals: Array<{
      _id: Id<"fitnessEntries">;
      category: string;
      name: string;
      calories: number;
      time: string;
      status: "logged" | "pending";
      kind: "meal" | "workout";
      date: string;
    }> = [];
    let todayWorkouts: typeof todayMeals = [];

    for (const date of weekDates) {
      const entries = await ctx.db
        .query("fitnessEntries")
        .withIndex("byUserDate", (q) =>
          q.eq("userId", user._id).eq("date", date)
        )
        .collect();

      const meals = entries.filter((e) => e.kind === "meal");
      const workouts = entries.filter((e) => e.kind === "workout");
      const caloriesIn = meals.reduce((s, e) => s + e.calories, 0);
      const workoutBurn = workouts.reduce((s, e) => s + e.calories, 0);
      const caloriesOut = bmr + workoutBurn;
      const balance = caloriesIn - caloriesOut;

      const [y, m, d] = date.split("-").map(Number);
      const dayLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      });

      weekBalances.push({
        date,
        day: dayLabel,
        caloriesIn,
        caloriesOut,
        balance,
      });

      if (date === args.date) {
        todayMeals = meals.sort((a, b) => a.time.localeCompare(b.time));
        todayWorkouts = workouts.sort((a, b) => a.time.localeCompare(b.time));
      }
    }

    const today = weekBalances.find((w) => w.date === args.date)!;
    const goalProgressPct =
      dailyCalorieTarget > 0
        ? Math.round((today.caloriesIn / dailyCalorieTarget) * 100)
        : 0;

    const startW = profile?.startWeightKg ?? 80;
    const currentW = profile?.currentWeightKg ?? 80;
    const targetW = profile?.targetWeightKg ?? 75;
    const totalDelta = Math.abs(startW - targetW) || 1;
    const doneDelta = Math.abs(startW - currentW);
    const weightProgressPct = Math.min(100, Math.round((doneDelta / totalDelta) * 100));

    const weekIn = weekBalances.reduce((s, d) => s + d.caloriesIn, 0);
    const weekOut = weekBalances.reduce((s, d) => s + d.caloriesOut, 0);
    const weekAvgBalance = Math.round(
      weekBalances.reduce((s, d) => s + d.balance, 0) / weekBalances.length
    );

    return {
      profile,
      date: args.date,
      caloriesIn: today.caloriesIn,
      caloriesOut: today.caloriesOut,
      net: today.caloriesIn - today.caloriesOut,
      remainingBudget: dailyCalorieTarget - today.caloriesIn,
      dailyCalorieTarget,
      bmr,
      goalProgressPct,
      weightProgressPct,
      weightLostKg: Math.round((startW - currentW) * 10) / 10,
      weekBalances,
      weekIn,
      weekOut,
      weekAvgBalance,
      todayMeals,
      todayWorkouts,
      todayEntries: [...todayMeals, ...todayWorkouts].sort((a, b) =>
        a.time.localeCompare(b.time)
      ),
      mealCount: todayMeals.length,
      workoutCount: todayWorkouts.length,
    };
  },
});

/** Recent entries for search / reports */
export const searchEntries = query({
  args: { q: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    const needle = args.q.trim().toLowerCase().slice(0, 60);
    if (!needle) return [];

    const all = await ctx.db
      .query("fitnessEntries")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .collect();

    return all
      .filter(
        (e) =>
          e.name.toLowerCase().includes(needle) ||
          e.category.toLowerCase().includes(needle)
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 50);
  },
});
