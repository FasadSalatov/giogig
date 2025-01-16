'use client'

import { Area, AreaChart as RechartsArea, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface DataPoint {
  date: string
  value: number
}

interface AreaChartProps {
  data: DataPoint[]
  minimal?: boolean
}

export default function AreaChart({ data, minimal = false }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsArea data={data}>
        {!minimal && (
          <>
            <XAxis 
              dataKey="date" 
              stroke="#71717a" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(24, 24, 27, 0.9)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              itemStyle={{ color: '#f59e0b' }}
              formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Объем']}
            />
          </>
        )}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f59e0b"
          strokeWidth={2}
          fill="url(#areaGradient)"
        />
      </RechartsArea>
    </ResponsiveContainer>
  )
}
