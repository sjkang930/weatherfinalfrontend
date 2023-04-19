import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'

export default function User({ setUser }) {
  const [users, setUsers] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      users.find((user) => user.username == username && user.email === email)
    ) {
      setUser(
        users.find((user) => user.username == username && user.email === email),
      )
      setEmail('')
      setUsername('')
      return
    } else {
      const { data } = await axios.post('/api/users', {
        username,
        email,
      })
    //   console.log(data)
      setUser(data)
      setUsername('')
      setEmail('')
      return data
    }
  }
//   console.log(users)

  return (
    <>
      <div className='userCard'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name: </label>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">User Email: </label>
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='btn' type="submit">LogIn</button>
        </form>
      </div>
    </>
  )
}
