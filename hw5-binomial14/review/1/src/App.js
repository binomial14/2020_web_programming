import React, { useState } from 'react'
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
        }}
      >
        start game
      </button>
    </div>
  )

  const game = (
    <div>
      {hasWon ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Guess a number between 1 to 100</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyUp={async (event) =>{
                if(event.keyCode===13 && event.target.value!==""){
                  
                    const msg = await guess(number);

                    if(msg==='Correct!!!') {
                      setHasWon(true);
                      setStatus(msg);
                    }else{
                      setHasWon(false);
                      setStatus(msg);
                    }
                  
                }
              }
            }
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={
              async () =>{
                const msg = await guess(number);

                if(msg==='Correct!!!') {
                  setHasWon(true);
                  setStatus(msg);
                }else{
                  setHasWon(false);
                  setStatus(msg);
                }
              }
            }
            disabled={!number}
          >
            guess!
          </button>
          <p>{status}</p>
        </React.Fragment>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
