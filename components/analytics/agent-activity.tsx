"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import type { AgentMetrics } from "@/lib/data/analytics"

export function AgentActivity({ data }: { data: AgentMetrics }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">Active Agents</p>
            <p className="text-2xl font-semibold tabular-nums">
              {data.activeAgents}
            </p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              Collections / Agent
            </p>
            <p className="text-2xl font-semibold tabular-nums">
              {data.collectionsPerAgent}
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Top Agents
        </p>
        <ItemGroup className="gap-0">
          {data.topAgents.map((agent) => (
            <Item
              key={agent.name}
              size="xs"
              className="px-0 group-hover/item-group:bg-transparent"
            >
              <ItemContent>
                <ItemTitle>{agent.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">
                  {agent.collections} collections
                </span>
                <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">
                  {agent.sessions} sessions
                </span>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
