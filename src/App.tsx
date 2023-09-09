import { useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import './App.css'
import { Link } from "react-router-dom";


const USERS = ["user1", "user2", "user3", "user4"]

function App() {
  const [user, setUser] = useState(USERS[0]);
  const games = useQuery(api.game.gamesList)
  const createGame = useMutation(api.game.createGame)
  const addUsers = useMutation(api.game.addUser)
  const currentUser = useQuery(api.game.currentUser, { username: user })
  const joinGame = useMutation(api.game.joinGame)

  const handlleCreateGame = () => {
    if (currentUser) {
      createGame({ name: "GameName", owner: currentUser?._id, status: "waiting", players: [currentUser._id] })
    }
  }

  const handlleAddUsers = () => {
    USERS.map((user) => {
      addUsers({ username: user })
    })
  }

  return (
    <div className='flex flex-col gap-10 items-center'>
      <button onClick={handlleAddUsers}>Add Users</button>
      <select onChange={e => setUser(e.target.value)}>
        {USERS.map((user) => {
          return <option key={user} value={user}>{user}</option>
        })}
      </select>
      <h1>Selected User: {user}</h1>
      {(currentUser) ?
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div className='flex gap-3'>
            <button onClick={handlleCreateGame}>CreateGame</button>
          </div>
          <ul>

            {
              games?.map((game) => {
                return <li key={game._id} className='grid grid-cols-3'> <div>Game ID: {game._id}</div> <div>{game.status}</div>
                  {currentUser ? <Link to={game._id} onClick={() => { joinGame({ gameId: game._id, players: game.players.concat(currentUser._id) }) }} >Join Game</Link> : null}
                </li>
              })
            }
          </ul >
        </div>
        : <div>Not user in db</div>}
    </div>
  )
}

export default App
