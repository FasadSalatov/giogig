'use client'

import { Line, LineChart as RechartsLine, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface DataPoint {
  date: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  minimal?: boolean
}

export default function LineChart({ data, minimal = false }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLine data={data}>
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
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(24, 24, 27, 0.9)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              itemStyle={{ color: '#f59e0b' }}
              formatter={(value: number) => [value.toLocaleString(), 'Значение']}
            />
          </>
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={!minimal}
        />
      </RechartsLine>
    </ResponsiveContainer>
  )
}
