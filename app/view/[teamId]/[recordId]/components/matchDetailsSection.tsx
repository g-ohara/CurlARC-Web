import { RecordDetail } from '../../../../../types/model'
import React from 'react'

type MatchDetailsSectionProps = {
  recordDetails: RecordDetail
}

export default function MatchDetailsSection({ recordDetails }: MatchDetailsSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Match Details</h2>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
        <dt className="text-gray-500">Date</dt>
        <dd>{String(recordDetails.date)}</dd>
        <dt className="text-gray-500">Venue</dt>
        <dd>{recordDetails.place}</dd>
      </dl>
    </section>
  )
}
