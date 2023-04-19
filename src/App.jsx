import { useEffect, useState } from 'react'
import './App.css'
import useSignalR from './useSignalR'
import User from './components/User'
import Location from './components/Location'

export default function App() {
  const { connection } = useSignalR('/r/chat')
  const [weatherData, setWeatherData] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!connection) {
      return
    }
    connection.on('ReceiveMessage', (weatherData) => {
      setWeatherData((prev) => [...prev, weatherData])
    })
  }, [connection])
  console.log(weatherData)

  return (
    <div className="">
      {/* <p>{connection ? 'Connected' : 'Not connected'}</p> */}

      {!user?.userId ? (
        <User setUser={setUser} />
      ) : (
        <div>
          <div className="welcome">Welcome to USA Weather {user?.username}!
          <div>(Enter a USA city name to get the weather. eg. seattle)</div>
          </div>
          
          <Location user={user}/>
        </div>
      )}
    </div>
  )
}
