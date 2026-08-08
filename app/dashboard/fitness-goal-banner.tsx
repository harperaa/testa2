"use client"

import Link from "next/link"
import { IconFlame, IconTrophy } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { goalTypeLabel } from "@/lib/fitness"

type Props = {
  goalTitle?: string
  goalType?: string
  weightProgressPct?: number
  weightLostKg?: number
  streakDays?: number
  weekAvgBalance?: number
  loading?: boolean
}

export function FitnessGoalBanner({
  goalTitle = "Set your fitness goal",
  goalType = "fat_loss",
  weightProgressPct = 0,
  weightLostKg = 0,
  streakDays = 0,
  weekAvgBalance = 0,
  loading,
}: Props) {
  if (loading) {
    return (
      <Card id="progress" className="border-border/60 scroll-mt-20 shadow-sm">
        <CardContent className="pt-6">
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  const ahead =
    weekAvgBalance < 0
      ? `${Math.abs(Math.round(weekAvgBalance))} kcal avg deficit this week`
      : weekAvgBalance > 0
        ? `${Math.round(weekAvgBalance)} kcal avg surplus this week`
        : "Balanced week so far"

  return (
    <Card
      id="progress"
      className="border-border/60 from-card to-emerald-500/5 scroll-mt-20 bg-gradient-to-br shadow-sm"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Fitness goal
        </CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/settings">Edit goal</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight">{goalTitle}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {ahead}{" "}
              <IconTrophy className="text-amber-500 mb-0.5 inline size-4" />
            </p>
          </div>
          <span className="text-2xl font-bold tabular-nums text-emerald-500">
            {Math.min(100, Math.round(weightProgressPct))}%
          </span>
        </div>

        <div className="bg-muted h-2.5 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, weightProgressPct))}%` }}
          />
        </div>

        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {goalTypeLabel(goalType)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-500" />
            {weightLostKg >= 0 ? `${weightLostKg} kg down` : `${Math.abs(weightLostKg)} kg up`}
          </span>
          <span className="flex items-center gap-1.5">
            <IconFlame className="size-3.5 text-orange-500" />
            {streakDays} day{streakDays === 1 ? "" : "s"} streak
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
