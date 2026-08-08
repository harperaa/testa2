"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type WeekPoint = {
  date: string
  day: string
  caloriesIn: number
  caloriesOut: number
  balance: number
}

function BalanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; payload: WeekPoint }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  const value = payload[0].value
  const sign = value > 0 ? "+" : ""
  return (
    <div className="bg-popover text-popover-foreground rounded-lg border px-3 py-2 text-sm shadow-md">
      <p className="font-medium">{label}</p>
      <p className="text-muted-foreground text-xs">
        In {point.caloriesIn} · Out {point.caloriesOut}
      </p>
      <p className={value < 0 ? "text-emerald-500" : "text-cyan-500"}>
        {sign}
        {value} kcal
      </p>
    </div>
  )
}

export function WeeklyEnergyChart({
  data = [],
  loading,
}: {
  data?: WeekPoint[]
  loading?: boolean
}) {
  if (loading) {
    return (
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold tracking-tight text-cyan-500">
            Weekly Energy Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight text-cyan-500">
          Weekly Energy Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[220px] w-full">
          {data.length === 0 ? (
            <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
              Log meals and workouts to see your weekly balance.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 12, right: 8, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="energyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.55} />
                    <stop offset="55%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-border/50"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  width={40}
                  className="fill-muted-foreground"
                />
                <ReferenceLine y={0} stroke="currentColor" className="text-border" />
                <Tooltip content={<BalanceTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  fill="url(#energyFill)"
                  dot={{ r: 3, fill: "#34d399", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#22d3ee" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
