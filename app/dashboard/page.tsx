"use client"

import { TodayBalance } from "./today-balance"
import { WeeklyEnergyChart } from "./weekly-energy-chart"
import { MealLog } from "./meal-log"
import { FitnessGoalBanner } from "./fitness-goal-banner"
import { useFitnessDashboard } from "./use-fitness-dashboard"

export default function Page() {
  const { date, dashboard, loading } = useFitnessDashboard()

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <TodayBalance
          loading={loading}
          caloriesIn={dashboard?.caloriesIn}
          caloriesOut={dashboard?.caloriesOut}
          net={dashboard?.net}
          dailyCalorieTarget={dashboard?.dailyCalorieTarget}
          goalProgressPct={dashboard?.goalProgressPct}
        />
        <WeeklyEnergyChart
          loading={loading}
          data={dashboard?.weekBalances}
        />
        <MealLog
          loading={loading}
          date={date}
          entries={dashboard?.todayEntries}
        />
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
    </div>
  )
}
