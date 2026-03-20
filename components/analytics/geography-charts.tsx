"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { GeographyData } from "@/lib/data/analytics"

const chartConfig = {
  users: {
    label: "Users",
  },
  indonesia: {
    label: "Indonesia",
    color: "var(--chart-1)",
  },
  russia: {
    label: "Russia",
    color: "var(--chart-2)",
  },
  australia: {
    label: "Australia",
    color: "var(--chart-3)",
  },
  china: {
    label: "China",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function GeographyCharts({ data }: { data: GeographyData }) {
  const totalUsers = data.countries.reduce((sum, item) => sum + item.users, 0)

  const pieData = data.countries.map((item) => ({
    country: item.country.toLowerCase(),
    users: item.users,
    fill: item.fill,
  }))

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Users by Country</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[190px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="users"
                nameKey="country"
                innerRadius={50}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold tabular-nums"
                          >
                            {totalUsers.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground text-xs"
                          >
                            Users
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="country" />}
                className="translate-y-2"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Cities</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.cities.map((city) => (
                <TableRow key={`${city.city}-${city.country}`}>
                  <TableCell className="font-medium">{city.city}</TableCell>
                  <TableCell>{city.country}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {city.users.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
