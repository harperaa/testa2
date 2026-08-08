"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeeklyEnergyChart } from "../weekly-energy-chart"
import { FitnessGoalBanner } from "../fitness-goal-banner"
import { useFitnessDashboard } from "../use-fitness-dashboard"

export default function ProgressPage() {
  const { dashboard, loading } = useFitnessDashboard()

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Progress</h2>
        <p className="text-muted-foreground text-sm">
          Weekly energy balance and goal progress.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyEnergyChart loading={loading} data={dashboard?.weekBalances} />
        <FitnessGoalBanner
          loading={loading}
          goalTitle={dashboard?.profile?.goalTitle}
          goalType={dashboard?.profile?.goalType}
          weightProgressPct={dashboard?.weightProgressPct}
          weightLostKg={dashboard?.weightLostKg}
          streakDays={dashboard?.profile?.streakDays}
          weekAvgBalance={dashboard?.weekAvgBalance}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Week calories in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-emerald-500">
              {loading ? "—" : (dashboard?.weekIn ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Week calories out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-cyan-500">
              {loading ? "—" : (dashboard?.weekOut ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Avg daily balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">
              {loading
                ? "—"
                : `${(dashboard?.weekAvgBalance ?? 0) > 0 ? "+" : ""}${dashboard?.weekAvgBalance ?? 0}`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
