import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList