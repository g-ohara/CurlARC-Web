import React from 'react'

interface TeamDetailsProps {
  data: {
    key: string
    value: string
  }[]
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ data }) => {
  return (
    <div>
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
