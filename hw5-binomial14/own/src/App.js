import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
          setStatus('')
        }}
      >
        start game
      </button>
    </div>
  )

  const game = (
    <div>
      {hasWon ? (
        <>
          <p>you won! the number was {number}.</p>
          <button
            onClick={async () => {
              await restart()

              setHasWon(false)
              setStatus('')
              setNumber('')
            }}
          >
            restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between 1 to 100</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={async () => {
                const action = guess(number)
                
                action.then(function(result)
                {
                  if(result==="Bigger")
                  {
                    setStatus("Bigger than " + number)
                    setNumber('')
                  }
                  else if(result==="Smaller than "+ number)
                  {
                    setStatus("Smaller")
                    setNumber('')
                  }
                  else
                  {
                    setHasWon(true)
                  }
                })

              }
              }
            disabled={!number}
          >
            guess!
          </button>
          <p>{status}</p>
        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
