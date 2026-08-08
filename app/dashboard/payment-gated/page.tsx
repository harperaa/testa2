"use client"

import { Protect } from "@clerk/nextjs"
import CustomClerkPricing from "@/components/custom-clerk-pricing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFitnessDashboard } from "../use-fitness-dashboard"
import { goalTypeLabel } from "@/lib/fitness"

function UpgradeCard() {
  return (
    <>
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-center text-2xl font-semibold lg:text-3xl">
          Unlock Pro fitness insights
        </h1>
        <p className="text-muted-foreground">
          Advanced calorie trends, custom goal targets, and deeper workout
          analytics are available on paid plans.
        </p>
      </div>
      <div className="px-8 lg:px-12">
        <CustomClerkPricing />
      </div>
    </>
  )
}

function ProInsights() {
  const { dashboard, loading } = useFitnessDashboard()

  const deficitDays =
    dashboard?.weekBalances.filter((d) => d.balance < 0).length ?? 0
  const surplusDays =
    dashboard?.weekBalances.filter((d) => d.balance > 0).length ?? 0
  const trainingDays =
    dashboard?.weekBalances.filter((d) => d.caloriesOut > (dashboard.bmr ?? 0)).length ?? 0

  const tip =
    dashboard?.profile?.goalType === "fat_loss"
      ? deficitDays >= 4
        ? "Strong deficit consistency — keep protein high and avoid crash cuts."
        : "Aim for more days under your calorie target this week."
      : dashboard?.profile?.goalType === "muscle_gain"
        ? surplusDays >= 4
          ? "You are in surplus most days — pair with progressive strength work."
          : "Add a small surplus on training days to support muscle gain."
        : "Maintenance looks best with small day-to-day swings around zero."

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold">Pro insights</h1>
        <p className="text-muted-foreground text-sm">
          Personalized read of your last 7 days
          {dashboard?.profile
            ? ` for ${goalTypeLabel(dashboard.profile.goalType).toLowerCase()}`
            : ""}
          .
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">
              Deficit days
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {loading ? "—" : deficitDays}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">
              Surplus days
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {loading ? "—" : surplusDays}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">
              Training days
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {loading ? "—" : trainingDays}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">
              Avg balance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold tabular-nums">
            {loading
              ? "—"
              : `${(dashboard?.weekAvgBalance ?? 0) > 0 ? "+" : ""}${dashboard?.weekAvgBalance ?? 0}`}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coach note</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm space-y-2">
          <p>{loading ? "Analyzing your week…" : tip}</p>
          <p>
            Week totals:{" "}
            <span className="text-foreground font-medium">
              {dashboard?.weekIn?.toLocaleString() ?? 0} in
            </span>
            {" · "}
            <span className="text-foreground font-medium">
              {dashboard?.weekOut?.toLocaleString() ?? 0} out
            </span>
            . BMR baseline {dashboard?.bmr ?? "—"} kcal/day plus workouts.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProPage() {
  return (
    <Protect
      condition={(has) => !has({ plan: "free_user" })}
      fallback={<UpgradeCard />}
    >
      <ProInsights />
    </Protect>
  )
}
