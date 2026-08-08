/** Client helpers for Grok Fit dates and food presets */

export function localDateString(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function localTimeString(d = new Date()): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

export const MEAL_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
] as const

export const WORKOUT_CATEGORIES = [
  "Cardio",
  "Strength",
  "Recovery",
  "Steps",
  "HIIT",
] as const

export type FoodPreset = {
  name: string
  category: (typeof MEAL_CATEGORIES)[number]
  calories: number
}

export type WorkoutPreset = {
  name: string
  category: (typeof WORKOUT_CATEGORIES)[number]
  calories: number
}

export const FOOD_LIBRARY: FoodPreset[] = [
  { name: "Oatmeal with berries", category: "Breakfast", calories: 320 },
  { name: "Avocado toast + eggs", category: "Breakfast", calories: 480 },
  { name: "Greek yogurt + honey", category: "Breakfast", calories: 220 },
  { name: "Protein smoothie", category: "Breakfast", calories: 350 },
  { name: "Grilled chicken bowl", category: "Lunch", calories: 620 },
  { name: "Turkey wrap", category: "Lunch", calories: 510 },
  { name: "Salmon salad", category: "Lunch", calories: 540 },
  { name: "Quinoa veggie bowl", category: "Lunch", calories: 480 },
  { name: "Salmon + quinoa", category: "Dinner", calories: 560 },
  { name: "Lean beef stir-fry", category: "Dinner", calories: 680 },
  { name: "Chicken pasta (light)", category: "Dinner", calories: 610 },
  { name: "Tofu stir-fry", category: "Dinner", calories: 470 },
  { name: "Protein shake + banana", category: "Snack", calories: 310 },
  { name: "Apple + almond butter", category: "Snack", calories: 190 },
  { name: "Cottage cheese cup", category: "Snack", calories: 150 },
  { name: "Protein bar", category: "Snack", calories: 200 },
]

export const WORKOUT_LIBRARY: WorkoutPreset[] = [
  { name: "Morning run 5K", category: "Cardio", calories: 420 },
  { name: "Cycling 30 min", category: "Cardio", calories: 310 },
  { name: "HIIT session", category: "HIIT", calories: 390 },
  { name: "Upper body strength", category: "Strength", calories: 280 },
  { name: "Legs day", category: "Strength", calories: 340 },
  { name: "Full-body dumbbells", category: "Strength", calories: 300 },
  { name: "Yoga flow", category: "Recovery", calories: 120 },
  { name: "Evening walk", category: "Steps", calories: 160 },
  { name: "Swimming laps", category: "Cardio", calories: 450 },
]

export function goalTypeLabel(goalType: string): string {
  if (goalType === "fat_loss") return "Fat loss"
  if (goalType === "muscle_gain") return "Muscle gain"
  if (goalType === "maintenance") return "Maintenance"
  return goalType
}
