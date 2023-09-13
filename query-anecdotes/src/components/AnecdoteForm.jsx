import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // I managed to post content with a length of less than 5 so i made this condition in the frontend
    if (content.length >= 5) {
      console.log('new anecdote')
      newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
      const notificationMessage = {
        type: 'SHOW',
        payload: `anecdote '${content}' added`
      }
      dispatch(notificationMessage)
    }
    else {
      const notificationMessage = {
        type: 'SHOW',
        payload: `too short anecdote, must have length 5 or more`
      }
      dispatch(notificationMessage)
    }
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
