import { RecordDetail } from "@/types/model"

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

  return {
    friend: {
      teamName: '',
      color: 'red',
      scores: myTeamScores,
      total: myTeamTotal
    },
    enemy: {
      teamName: opponentTeamName,
      color: 'blue',
      scores: opponentTeamScores,
      total: opponentTeamTotal
    }
  }
}
