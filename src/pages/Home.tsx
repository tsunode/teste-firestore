import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const submit = (event) => {
    event.preventDefault();
    console.log(name)
    navigate('chat', { state: { name } })
  }

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={event => setName(event?.target.value)} />
        <button type='submit'>submit</button>
      </form>
    </>
  )
}
