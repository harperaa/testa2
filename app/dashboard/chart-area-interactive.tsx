"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Calories in vs calories out chart"

const chartData = [
  { date: "2024-04-01", caloriesIn: 2100, caloriesOut: 2320 },
  { date: "2024-04-02", caloriesIn: 1980, caloriesOut: 2400 },
  { date: "2024-04-03", caloriesIn: 2250, caloriesOut: 2180 },
  { date: "2024-04-04", caloriesIn: 2050, caloriesOut: 2550 },
  { date: "2024-04-05", caloriesIn: 1890, caloriesOut: 2610 },
  { date: "2024-04-06", caloriesIn: 2400, caloriesOut: 2300 },
  { date: "2024-04-07", caloriesIn: 2150, caloriesOut: 2480 },
  { date: "2024-04-08", caloriesIn: 1920, caloriesOut: 2700 },
  { date: "2024-04-09", caloriesIn: 2300, caloriesOut: 2200 },
  { date: "2024-04-10", caloriesIn: 2010, caloriesOut: 2490 },
  { date: "2024-04-11", caloriesIn: 1880, caloriesOut: 2580 },
  { date: "2024-04-12", caloriesIn: 2200, caloriesOut: 2350 },
  { date: "2024-04-13", caloriesIn: 1950, caloriesOut: 2620 },
  { date: "2024-04-14", caloriesIn: 2100, caloriesOut: 2410 },
  { date: "2024-04-15", caloriesIn: 1780, caloriesOut: 2550 },
  { date: "2024-04-16", caloriesIn: 2050, caloriesOut: 2380 },
  { date: "2024-04-17", caloriesIn: 2320, caloriesOut: 2500 },
  { date: "2024-04-18", caloriesIn: 1900, caloriesOut: 2680 },
  { date: "2024-04-19", caloriesIn: 2150, caloriesOut: 2290 },
  { date: "2024-04-20", caloriesIn: 2000, caloriesOut: 2440 },
  { date: "2024-04-21", caloriesIn: 1850, caloriesOut: 2600 },
  { date: "2024-04-22", caloriesIn: 2220, caloriesOut: 2330 },
  { date: "2024-04-23", caloriesIn: 1980, caloriesOut: 2520 },
  { date: "2024-04-24", caloriesIn: 2100, caloriesOut: 2470 },
  { date: "2024-04-25", caloriesIn: 1750, caloriesOut: 2650 },
  { date: "2024-04-26", caloriesIn: 2300, caloriesOut: 2280 },
  { date: "2024-04-27", caloriesIn: 1920, caloriesOut: 2580 },
  { date: "2024-04-28", caloriesIn: 2080, caloriesOut: 2420 },
  { date: "2024-04-29", caloriesIn: 1860, caloriesOut: 2710 },
  { date: "2024-04-30", caloriesIn: 2140, caloriesOut: 2390 },
  { date: "2024-05-01", caloriesIn: 2000, caloriesOut: 2450 },
  { date: "2024-05-02", caloriesIn: 1880, caloriesOut: 2590 },
  { date: "2024-05-03", caloriesIn: 2250, caloriesOut: 2310 },
  { date: "2024-05-04", caloriesIn: 1950, caloriesOut: 2640 },
  { date: "2024-05-05", caloriesIn: 2100, caloriesOut: 2480 },
  { date: "2024-05-06", caloriesIn: 1780, caloriesOut: 2720 },
  { date: "2024-05-07", caloriesIn: 2200, caloriesOut: 2360 },
  { date: "2024-05-08", caloriesIn: 2020, caloriesOut: 2510 },
  { date: "2024-05-09", caloriesIn: 1900, caloriesOut: 2600 },
  { date: "2024-05-10", caloriesIn: 2150, caloriesOut: 2400 },
  { date: "2024-05-11", caloriesIn: 1850, caloriesOut: 2550 },
  { date: "2024-05-12", caloriesIn: 2080, caloriesOut: 2430 },
  { date: "2024-05-13", caloriesIn: 2300, caloriesOut: 2270 },
  { date: "2024-05-14", caloriesIn: 1920, caloriesOut: 2680 },
  { date: "2024-05-15", caloriesIn: 2000, caloriesOut: 2490 },
  { date: "2024-05-16", caloriesIn: 1750, caloriesOut: 2610 },
  { date: "2024-05-17", caloriesIn: 2180, caloriesOut: 2380 },
  { date: "2024-05-18", caloriesIn: 1950, caloriesOut: 2540 },
  { date: "2024-05-19", caloriesIn: 2100, caloriesOut: 2460 },
  { date: "2024-05-20", caloriesIn: 1880, caloriesOut: 2700 },
  { date: "2024-05-21", caloriesIn: 2220, caloriesOut: 2320 },
  { date: "2024-05-22", caloriesIn: 2010, caloriesOut: 2500 },
  { date: "2024-05-23", caloriesIn: 1840, caloriesOut: 2580 },
  { date: "2024-05-24", caloriesIn: 2090, caloriesOut: 2440 },
  { date: "2024-05-25", caloriesIn: 1960, caloriesOut: 2520 },
  { date: "2024-05-26", caloriesIn: 2300, caloriesOut: 2290 },
  { date: "2024-05-27", caloriesIn: 1820, caloriesOut: 2650 },
  { date: "2024-05-28", caloriesIn: 2140, caloriesOut: 2410 },
  { date: "2024-05-29", caloriesIn: 1900, caloriesOut: 2570 },
  { date: "2024-05-30", caloriesIn: 2050, caloriesOut: 2480 },
  { date: "2024-05-31", caloriesIn: 1780, caloriesOut: 2620 },
  { date: "2024-06-01", caloriesIn: 2120, caloriesOut: 2390 },
  { date: "2024-06-02", caloriesIn: 1980, caloriesOut: 2510 },
  { date: "2024-06-03", caloriesIn: 2250, caloriesOut: 2340 },
  { date: "2024-06-04", caloriesIn: 1860, caloriesOut: 2680 },
  { date: "2024-06-05", caloriesIn: 2100, caloriesOut: 2450 },
  { date: "2024-06-06", caloriesIn: 1920, caloriesOut: 2560 },
  { date: "2024-06-07", caloriesIn: 2000, caloriesOut: 2490 },
  { date: "2024-06-08", caloriesIn: 1750, caloriesOut: 2710 },
  { date: "2024-06-09", caloriesIn: 2180, caloriesOut: 2370 },
  { date: "2024-06-10", caloriesIn: 1950, caloriesOut: 2530 },
  { date: "2024-06-11", caloriesIn: 2080, caloriesOut: 2420 },
  { date: "2024-06-12", caloriesIn: 1840, caloriesOut: 2600 },
  { date: "2024-06-13", caloriesIn: 2200, caloriesOut: 2310 },
  { date: "2024-06-14", caloriesIn: 1900, caloriesOut: 2550 },
  { date: "2024-06-15", caloriesIn: 2050, caloriesOut: 2470 },
  { date: "2024-06-16", caloriesIn: 1820, caloriesOut: 2640 },
  { date: "2024-06-17", caloriesIn: 2150, caloriesOut: 2400 },
  { date: "2024-06-18", caloriesIn: 1980, caloriesOut: 2500 },
  { date: "2024-06-19", caloriesIn: 1880, caloriesOut: 2590 },
  { date: "2024-06-20", caloriesIn: 2100, caloriesOut: 2430 },
  { date: "2024-06-21", caloriesIn: 1920, caloriesOut: 2520 },
  { date: "2024-06-22", caloriesIn: 2300, caloriesOut: 2280 },
  { date: "2024-06-23", caloriesIn: 1750, caloriesOut: 2700 },
  { date: "2024-06-24", caloriesIn: 2020, caloriesOut: 2460 },
  { date: "2024-06-25", caloriesIn: 1950, caloriesOut: 2540 },
  { date: "2024-06-26", caloriesIn: 2120, caloriesOut: 2380 },
  { date: "2024-06-27", caloriesIn: 1860, caloriesOut: 2610 },
  { date: "2024-06-28", caloriesIn: 2080, caloriesOut: 2450 },
  { date: "2024-06-29", caloriesIn: 1900, caloriesOut: 2570 },
  { date: "2024-06-30", caloriesIn: 1840, caloriesOut: 2310 },
]

const chartConfig = {
  balance: {
    label: "Energy balance",
  },
  caloriesIn: {
    label: "Calories in",
    color: "var(--primary)",
  },
  caloriesOut: {
    label: "Calories out",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Calories in vs out</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Daily energy balance for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCaloriesIn" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-caloriesIn)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-caloriesIn)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCaloriesOut" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-caloriesOut)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-caloriesOut)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="caloriesOut"
              type="natural"
              fill="url(#fillCaloriesOut)"
              stroke="var(--color-caloriesOut)"
              stackId="a"
            />
            <Area
              dataKey="caloriesIn"
              type="natural"
              fill="url(#fillCaloriesIn)"
              stroke="var(--color-caloriesIn)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
