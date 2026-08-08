"use client"

import * as React from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FOOD_LIBRARY,
  MEAL_CATEGORIES,
  WORKOUT_CATEGORIES,
  WORKOUT_LIBRARY,
  localDateString,
  localTimeString,
} from "@/lib/fitness"

type EntryKind = "meal" | "workout"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultKind?: EntryKind
  defaultDate?: string
}

export function AddEntryDialog({
  open,
  onOpenChange,
  defaultKind = "meal",
  defaultDate,
}: Props) {
  const addEntry = useMutation(api.fitness.addEntry)
  const [kind, setKind] = React.useState<EntryKind>(defaultKind)
  const [category, setCategory] = React.useState<string>(MEAL_CATEGORIES[0])
  const [name, setName] = React.useState("")
  const [calories, setCalories] = React.useState("")
  const [time, setTime] = React.useState(localTimeString())
  const [date, setDate] = React.useState(defaultDate ?? localDateString())
  const [status, setStatus] = React.useState<"logged" | "pending">("logged")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setKind(defaultKind)
      setCategory(defaultKind === "meal" ? MEAL_CATEGORIES[0] : WORKOUT_CATEGORIES[0])
      setName("")
      setCalories("")
      setTime(localTimeString())
      setDate(defaultDate ?? localDateString())
      setStatus("logged")
    }
  }, [open, defaultKind, defaultDate])

  React.useEffect(() => {
    setCategory(kind === "meal" ? MEAL_CATEGORIES[0] : WORKOUT_CATEGORIES[0])
  }, [kind])

  const categories = kind === "meal" ? MEAL_CATEGORIES : WORKOUT_CATEGORIES
  const presets = kind === "meal" ? FOOD_LIBRARY : WORKOUT_LIBRARY

  const applyPreset = (presetName: string) => {
    const preset = presets.find((p) => p.name === presetName)
    if (!preset) return
    setName(preset.name)
    setCategory(preset.category)
    setCalories(String(preset.calories))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cal = Number(calories)
    if (!name.trim()) {
      toast.error("Enter a name")
      return
    }
    if (!Number.isFinite(cal) || cal < 0) {
      toast.error("Enter valid calories")
      return
    }
    setSaving(true)
    try {
      await addEntry({
        date,
        kind,
        category,
        name: name.trim(),
        calories: cal,
        time,
        status,
      })
      toast.success(kind === "meal" ? "Meal logged" : "Workout logged")
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save entry")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Log {kind === "meal" ? "meal" : "workout"}</SheetTitle>
          <SheetDescription>
            Track calories {kind === "meal" ? "in" : "out"} toward your daily energy balance.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onSubmit} className="mt-6 space-y-4 px-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={kind} onValueChange={(v) => setKind(v as EntryKind)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meal">Meal (in)</SelectItem>
                  <SelectItem value="workout">Workout (out)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick pick</Label>
            <Select onValueChange={applyPreset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose from library…" />
              </SelectTrigger>
              <SelectContent>
                {presets.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name} ({p.calories} kcal)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry-name">Name</Label>
            <Input
              id="entry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={kind === "meal" ? "e.g. Chicken bowl" : "e.g. Morning run"}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="entry-cal">Calories</Label>
              <Input
                id="entry-cal"
                type="number"
                min={0}
                max={20000}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-time">Time</Label>
              <Input
                id="entry-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="entry-date">Date</Label>
              <Input
                id="entry-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as "logged" | "pending")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logged">Logged</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {saving ? "Saving…" : "Save entry"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
