"use client"

import { Label, Pie, PieChart } from "recharts"

import { Badge } from "@/components/ui/badge"
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
import type { GeoData } from "@/lib/data/analytics"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function InvestorGeography({ data }: { data: GeoData }) {
  const topCountries = data.countries.slice(0, 5)
  const topCities = data.cities.slice(0, 8)
  const totalCountries = data.countries.length

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Visitors",
    },
    ...Object.fromEntries(
      topCountries.map((c, i) => [
        c.name.toLowerCase().replace(/\s+/g, "_"),
        {
          label: c.name,
          color: CHART_COLORS[i % CHART_COLORS.length],
        },
      ])
    ),
  }

  const pieData = topCountries.map((c, i) => ({
    country: c.name.toLowerCase().replace(/\s+/g, "_"),
    visitors: c.value,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Investors by Country</CardTitle>
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
                dataKey="visitors"
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
                            {totalCountries.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground text-xs"
                          >
                            Countries
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
          {data.targetMarketPct > 0 && (
            <div className="mt-2 flex justify-center">
              <Badge variant="secondary" className="tabular-nums">
                Target markets: {data.targetMarketPct.toFixed(1)}%
              </Badge>
            </div>
          )}
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
                <TableHead className="text-right">Visitors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCities.map((city) => (
                <TableRow key={`${city.name}-${city.country}`}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.country}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {city.value.toLocaleString()}
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
