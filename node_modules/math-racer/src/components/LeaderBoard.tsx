type Player = {
  name: string,
  score: number
}

type LeaderBoardProps = {
  players: Player[]
}
export const LeaderBoard = (props: LeaderBoardProps) => {
  return (
      <div className="leaderboard">

        {props.players.map(player => (<>
          <div> 
            {player.name}
          </div>
          <div> 
            {player.score}
          </div>
        </>))}
        
      </div>
  )
}