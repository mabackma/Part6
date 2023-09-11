import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(displayNotification(`you created anecdote '${content}'`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm