import { RecordDetail } from '@/app/@types/model'

export function extractTeamsScoreData(record: RecordDetail): TeamScore {
  const opponentTeamName = record.enemy_team_name

  const myTeamScores: number[] = []
  const opponentTeamScores: number[] = []
  let myTeamTotal = 0
  let opponentTeamTotal = 0

  // Check if ends_data is null or undefined
  if (record.ends_data) {
    record.ends_data.forEach((end) => {
      if (end.score >= 0) {
        myTeamScores.push(end.score)
        opponentTeamScores.push(0)
        myTeamTotal += end.score
      } else {
        myTeamScores.push(0)
        opponentTeamScores.push(Math.abs(end.score))
        opponentTeamTotal += Math.abs(end.score)
      }
    })
  }

  // Fill with 0 if there are less than 10 ends
  while (myTeamScores.length < 11) {
    myTeamScores.push(0)
    opponentTeamScores.push(0)
  }

  return {
    friend: {
      team: '',
      color: 'red',
      scores: myTeamScores,
      total: myTeamTotal
    },
    enemy: {
      team: opponentTeamName,
      color: 'blue',
      scores: opponentTeamScores,
      total: opponentTeamTotal
    }
  }
}
