"use client"

import {
  IconFlame,
  IconLeaf,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  caloriesIn?: number
  caloriesOut?: number
  net?: number
  dailyCalorieTarget?: number
  goalProgressPct?: number
  loading?: boolean
}

const RING_SIZE = 168
const STROKE = 12
const RADIUS = (RING_SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function TodayBalance({
  caloriesIn = 0,
  caloriesOut = 0,
  net = 0,
  dailyCalorieTarget = 1850,
  goalProgressPct = 0,
  loading,
}: Props) {
  const progress = Math.min(Math.max(goalProgressPct, 0), 150)
  const offset =
    CIRCUMFERENCE - (Math.min(progress, 100) / 100) * CIRCUMFERENCE
  const NetIcon = net <= 0 ? IconTrendingDown : IconTrendingUp

  if (loading) {
    return (
      <Card className="border-border/60 bg-card/80 overflow-hidden shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Today&apos;s Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 bg-card/80 overflow-hidden shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Today&apos;s Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="grid w-full flex-1 grid-cols-2 gap-4 sm:max-w-xs">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
              <IconLeaf className="size-3.5 text-emerald-500" />
              Calories in
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight text-emerald-500 sm:text-4xl">
              {Math.round(caloriesIn).toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
              <IconFlame className="size-3.5 text-cyan-500" />
              Calories out
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight text-cyan-500 sm:text-4xl">
              {Math.round(caloriesOut).toLocaleString()}
            </p>
          </div>
          <div className="col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
              <NetIcon className="size-3.5 text-emerald-500" />
              Net balance
            </div>
            <p className="mt-0.5 text-2xl font-bold tabular-nums text-emerald-500">
              {Math.round(net).toLocaleString()}
              <span className="text-muted-foreground ml-2 text-sm font-normal">
                kcal {net <= 0 ? "deficit" : "surplus"}
              </span>
            </p>
          </div>
        </div>

        <div className="relative flex shrink-0 flex-col items-center">
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            className="-rotate-90"
            aria-hidden
          >
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              className="text-muted/40"
            />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="url(#grok-fit-ring)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="grok-fit-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tabular-nums tracking-tight">
              {Math.round(goalProgressPct)}%
            </span>
            <span className="text-muted-foreground text-xs">of goal</span>
          </div>
          <p className="text-muted-foreground mt-3 text-center text-sm tabular-nums">
            {Math.round(caloriesIn).toLocaleString()} /{" "}
            {Math.round(dailyCalorieTarget).toLocaleString()} kcal goal
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
