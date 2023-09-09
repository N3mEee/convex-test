import { useParams } from "react-router-dom"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import './App.css'
import { Id } from "../convex/_generated/dataModel";

type TgameID = { gameId: Id<"games"> }
type TPlayers = { players: Id<"users">[] }


export default function Game() {
    const { gameId } = useParams<TgameID>();

    if (gameId) {
        return <div className="bg-black/60 border p-5 rounded-lg ">
            <GamePlay gameId={gameId} />
        </div>
    }

    return (
        <div>Id game not correct</div>
    )
}

function GamePlay({ gameId }: TgameID) {
    const game = useQuery(api.game.gameById, { gameId })
    return <div className="flex flex-col gap-10">
        <h1>Game</h1>
        <div>
            <p>GameID: {game?._id}</p>
            <p>OwnerID: {game?.owner}</p>
        </div>
        {game?.players ? <Users players={game.players} /> : null}
    </div>
}

function Users({ players }: TPlayers) {
    const users = useQuery(api.game.userById, { usersIds: players })
    return <div className="flex flex-col gap-4 justify-center items-center">
        <h1>Players in this game:</h1>
        <ul>
            {users?.map((user) => {
                return <li key={user._id} className="flex gap-4">
                    <p>{user.username}</p>
                    <p>id: {user._id}</p>
                </li>
            })}
        </ul>
    </div >
}