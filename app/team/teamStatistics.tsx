'use client'

import { ChartTooltipContent, ChartTooltip, ChartContainer } from '@/components/ui/chart'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

interface TeamStatisticsProps {
  data: {
    month: string
    desktop: number
  }[]
  className?: string
}

export const TeamStatistics: React.FC<TeamStatisticsProps> = ({ data, className }) => {
  return (
    <div className={className}>
      <h4 className="mb-2 text-2xl font-medium">Team Statistics</h4>
      <div className="grid gap-4 rounded-lg bg-white">
        <div className="relative aspect-square w-full">
          <ChartContainer
            config={{
              desktop: {
                label: 'Desktop',
                color: 'hsl(var(--chart-1))'
              }
            }}
            className="mx-auto aspect-square min-h-[250px] min-w-[250px] text-lg"
          >
            <RadarChart data={data}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
            </RadarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
