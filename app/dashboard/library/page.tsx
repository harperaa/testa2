"use client"

import * as React from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FOOD_LIBRARY,
  WORKOUT_LIBRARY,
  localDateString,
  localTimeString,
} from "@/lib/fitness"
import { useFitnessDashboard } from "../use-fitness-dashboard"

export default function LibraryPage() {
  useFitnessDashboard()
  const addEntry = useMutation(api.fitness.addEntry)
  const [busy, setBusy] = React.useState<string | null>(null)

  const logFood = async (name: string, category: string, calories: number) => {
    setBusy(name)
    try {
      await addEntry({
        date: localDateString(),
        kind: "meal",
        category,
        name,
        calories,
        time: localTimeString(),
        status: "logged",
      })
      toast.success(`Logged ${name}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to log")
    } finally {
      setBusy(null)
    }
  }

  const logWorkout = async (name: string, category: string, calories: number) => {
    setBusy(name)
    try {
      await addEntry({
        date: localDateString(),
        kind: "workout",
        category,
        name,
        calories,
        time: localTimeString(),
        status: "logged",
      })
      toast.success(`Logged ${name}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to log")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Food & workout library</h2>
        <p className="text-muted-foreground text-sm">
          One-tap log common meals and activities to today&apos;s balance.
        </p>
      </div>

      <Tabs defaultValue="food">
        <TabsList>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FOOD_LIBRARY.map((item) => (
              <Card key={item.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2">
                  <div className="text-muted-foreground text-sm">
                    {item.category} · {item.calories} kcal
                  </div>
                  <Button
                    size="sm"
                    className="bg-emerald-500 text-white hover:bg-emerald-600"
                    disabled={busy === item.name}
                    onClick={() => logFood(item.name, item.category, item.calories)}
                  >
                    {busy === item.name ? "…" : "Log"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="workouts" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORKOUT_LIBRARY.map((item) => (
              <Card key={item.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2">
                  <div className="text-muted-foreground text-sm">
                    {item.category} · {item.calories} kcal
                  </div>
                  <Button
                    size="sm"
                    disabled={busy === item.name}
                    onClick={() => logWorkout(item.name, item.category, item.calories)}
                  >
                    {busy === item.name ? "…" : "Log"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
