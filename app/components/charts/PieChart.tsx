'use client'

import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from 'recharts'

interface DataPoint {
  name: string
  value: number
}

interface PieChartProps {
  data: DataPoint[]
}

const COLORS = ['#f59e0b', '#3f3f46']

export default function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={40}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RechartsPie>
    </ResponsiveContainer>
  )
}
