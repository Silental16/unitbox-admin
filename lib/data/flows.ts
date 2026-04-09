export interface Flow {
  id: string
  name: string
  data: { nodes: unknown[]; edges: unknown[] }
  userId: string
  createdAt: string
  updatedAt: string
}

export function mapRowToFlow(row: Record<string, any>): Flow {
  return {
    id: row.id as string,
    name: (row.name ?? "Untitled Flow") as string,
    data: (row.data ?? { nodes: [], edges: [] }) as { nodes: unknown[]; edges: unknown[] },
    userId: (row.user_id ?? "") as string,
    createdAt: (row.created_at ?? "") as string,
    updatedAt: (row.updated_at ?? "") as string,
  }
}
