"use client"

import * as React from "react"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { AddEntryDialog } from "./add-entry-dialog"

type Entry = {
  _id: Id<"fitnessEntries">
  kind: "meal" | "workout"
  category: string
  name: string
  calories: number
  time: string
  status: "logged" | "pending"
}

export function MealLog({
  entries = [],
  loading,
  date,
}: {
  entries?: Entry[]
  loading?: boolean
  date?: string
}) {
  const deleteEntry = useMutation(api.fitness.deleteEntry)
  const [open, setOpen] = React.useState(false)
  const [defaultKind, setDefaultKind] = React.useState<"meal" | "workout">("meal")

  const onDelete = async (id: Id<"fitnessEntries">, name: string) => {
    try {
      await deleteEntry({ entryId: id })
      toast.success(`Removed ${name}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete")
    }
  }

  if (loading) {
    return (
      <Card id="meal-log" className="border-border/60 bg-card/80 scroll-mt-20 shadow-sm">
        <CardHeader>
          <CardTitle>Meal Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card id="meal-log" className="border-border/60 bg-card/80 scroll-mt-20 shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-3">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Meal &amp; workout log
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDefaultKind("workout")
                setOpen(true)
              }}
            >
              <IconPlus className="size-4" />
              Workout
            </Button>
            <Button
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={() => {
                setDefaultKind("meal")
                setOpen(true)
              }}
            >
              <IconPlus className="size-4" />
              Add meal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {entries.length === 0 ? (
            <div className="text-muted-foreground rounded-xl border border-dashed px-4 py-10 text-center text-sm">
              No entries yet today. Add a meal or workout to start your energy balance.
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry._id}
                className="hover:bg-muted/50 flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-sm font-semibold">{entry.category}</span>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {entry.time}
                    </span>
                    <span className="text-muted-foreground text-xs capitalize">
                      · {entry.kind}
                      {entry.status === "pending" ? " · pending" : ""}
                    </span>
                  </div>
                  <p className="text-muted-foreground truncate text-sm">{entry.name}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      entry.kind === "meal" ? "bg-emerald-500" : "bg-cyan-500"
                    }`}
                    aria-hidden
                  />
                  <span className="text-sm font-semibold tabular-nums">
                    {entry.kind === "workout" ? "+" : ""}
                    {entry.calories}{" "}
                    <span className="text-muted-foreground font-normal">kcal</span>
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground size-8"
                    onClick={() => onDelete(entry._id, entry.name)}
                    aria-label={`Delete ${entry.name}`}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      <AddEntryDialog
        open={open}
        onOpenChange={setOpen}
        defaultKind={defaultKind}
        defaultDate={date}
      />
    </>
  )
}
