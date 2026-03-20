"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
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

const chartConfig = {
  countries: {
    label: "Views %",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function InvestorGeography({ data }: { data: GeoData }) {
  const topCities = data.cities.slice(0, 8)

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Investors by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full" style={{ height: Math.max(180, data.countries.length * 32) }}>
            <BarChart
              accessibilityLayer
              data={data.countries}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <XAxis
                type="number"
                tickFormatter={(v) => `${v}%`}
                className="text-xs"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                className="text-xs"
                width={80}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="percentage"
                fill="var(--color-countries)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
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
