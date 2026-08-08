"use client"

import * as React from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFitnessDashboard } from "../use-fitness-dashboard"

export default function SettingsPage() {
  const { profile, loading } = useFitnessDashboard()
  const updateProfile = useMutation(api.fitness.updateProfile)

  const [goalType, setGoalType] = React.useState<"fat_loss" | "muscle_gain" | "maintenance">("fat_loss")
  const [goalTitle, setGoalTitle] = React.useState("")
  const [dailyCalorieTarget, setDailyCalorieTarget] = React.useState("1850")
  const [bmr, setBmr] = React.useState("1800")
  const [startWeightKg, setStartWeightKg] = React.useState("80")
  const [currentWeightKg, setCurrentWeightKg] = React.useState("80")
  const [targetWeightKg, setTargetWeightKg] = React.useState("75")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!profile) return
    setGoalType(profile.goalType)
    setGoalTitle(profile.goalTitle)
    setDailyCalorieTarget(String(profile.dailyCalorieTarget))
    setBmr(String(profile.bmr))
    setStartWeightKg(String(profile.startWeightKg))
    setCurrentWeightKg(String(profile.currentWeightKg))
    setTargetWeightKg(String(profile.targetWeightKg))
  }, [profile])

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({
        goalType,
        goalTitle,
        dailyCalorieTarget: Number(dailyCalorieTarget),
        bmr: Number(bmr),
        startWeightKg: Number(startWeightKg),
        currentWeightKg: Number(currentWeightKg),
        targetWeightKg: Number(targetWeightKg),
      })
      toast.success("Settings saved")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Configure your goal, calorie target, and BMR used for calories out.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Fitness profile</CardTitle>
          <CardDescription>
            Calories out each day = BMR + workout calories logged.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && !profile ? (
            <p className="text-muted-foreground text-sm">Loading profile…</p>
          ) : (
            <form onSubmit={onSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal title</Label>
                <Input
                  id="goal-title"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Goal type</Label>
                  <Select
                    value={goalType}
                    onValueChange={(v) =>
                      setGoalType(v as typeof goalType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fat_loss">Fat loss</SelectItem>
                      <SelectItem value="muscle_gain">Muscle gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daily-target">Daily calorie target (in)</Label>
                  <Input
                    id="daily-target"
                    type="number"
                    min={800}
                    max={10000}
                    value={dailyCalorieTarget}
                    onChange={(e) => setDailyCalorieTarget(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmr">BMR (base calories out)</Label>
                <Input
                  id="bmr"
                  type="number"
                  min={800}
                  max={5000}
                  value={bmr}
                  onChange={(e) => setBmr(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="start-w">Start weight (kg)</Label>
                  <Input
                    id="start-w"
                    type="number"
                    step="0.1"
                    value={startWeightKg}
                    onChange={(e) => setStartWeightKg(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-w">Current weight (kg)</Label>
                  <Input
                    id="current-w"
                    type="number"
                    step="0.1"
                    value={currentWeightKg}
                    onChange={(e) => setCurrentWeightKg(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-w">Target weight (kg)</Label>
                  <Input
                    id="target-w"
                    type="number"
                    step="0.1"
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 text-white hover:bg-emerald-600"
              >
                {saving ? "Saving…" : "Save settings"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
