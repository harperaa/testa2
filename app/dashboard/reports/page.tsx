"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFitnessDashboard } from "../use-fitness-dashboard"
import { goalTypeLabel } from "@/lib/fitness"

export default function ReportsPage() {
  const { dashboard, loading } = useFitnessDashboard()

  const rows = dashboard?.weekBalances ?? []

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Weekly report</h2>
          <p className="text-muted-foreground text-sm">
            Seven-day energy balance for your{" "}
            {dashboard?.profile
              ? goalTypeLabel(dashboard.profile.goalType).toLowerCase()
              : "fitness"}{" "}
            goal.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/progress">Open progress</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">Total in</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold tabular-nums text-emerald-500">
            {loading ? "—" : (dashboard?.weekIn ?? 0).toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">Total out</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold tabular-nums text-cyan-500">
            {loading ? "—" : (dashboard?.weekOut ?? 0).toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">Avg balance</CardTitle>
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
          <CardTitle className="text-base">Day by day</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left">
                <th className="pb-2 font-medium">Day</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 text-right font-medium">In</th>
                <th className="pb-2 text-right font-medium">Out</th>
                <th className="pb-2 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-muted-foreground py-6 text-center">
                    Loading…
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.date} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{row.day}</td>
                    <td className="text-muted-foreground py-2.5 tabular-nums">
                      {row.date}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-emerald-600">
                      {row.caloriesIn}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-cyan-600">
                      {row.caloriesOut}
                    </td>
                    <td
                      className={`py-2.5 text-right font-medium tabular-nums ${
                        row.balance <= 0 ? "text-emerald-600" : "text-orange-600"
                      }`}
                    >
                      {row.balance > 0 ? "+" : ""}
                      {row.balance}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
