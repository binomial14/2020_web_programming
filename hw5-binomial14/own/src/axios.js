import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')
  //console.log("start")
  //console.log(msg)
  return msg
}

const guess = async (number) => {
  const {
    data: { msg }
  } = await instance.get('/guess', { params: { number } })
  //console.log("guess")
  //console.log(msg)
  return msg
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
