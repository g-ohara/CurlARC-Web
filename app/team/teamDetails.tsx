import React from 'react'

interface TeamDetailsProps {
  data: {
    key: string
    value: string
  }[]
  className?: string
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ data, className }: TeamDetailsProps) => {
  return (
    <div className={className}>
      <h4 className="mb-4 text-2xl font-medium">Team Details</h4>
      {data.map((item) => (
        <div key={item.key}>
          <span>{item.key}: </span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
