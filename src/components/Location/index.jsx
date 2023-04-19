import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Location({ user }) {
  const [weatherData, setWeatherData] = useState([])
  const [location, setLocation] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`/api/weatherData/`)
      const userData = data?.filter((data) => data.userId == user.userId)
      setWeatherData(userData)
    })()
  }, [])

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=76ebe93db80cdd240e4c12388ace4fec`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(url)
    console.log(data)
    // setWeatherData([weather])
    const newData = await axios.post(`/api/weatherData/${user.userId}`, {
      location: data.name,
      temperature: data.main.temp,
      weatherDescription: data.weather[0].description,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.main.pressure,
    })
    setWeatherData((prev) => [...prev, newData.data])
    setLocation('')
  }
 const latestWeather = weatherData[weatherData.length - 1]
  return (
    <div className="app">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Enter Location"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {weatherData[0] && <p>{latestWeather?.location}</p>}
          </div>
          <div className="temp">
            {weatherData[0] && (
              <p>{Math.round(latestWeather?.temperature - 273.15)}°C</p>
            )}
          </div>
          <div className="description">
            {weatherData[0] && <p>{latestWeather?.weatherDescription}</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {weatherData[0] && (
              <>
                <p className="bold">
                  {Math.round(latestWeather?.feels_like - 273.15)}°C
                </p>
                <p>Feels Like</p>
              </>
            )}
          </div>
          <div className="humidity">
            {weatherData[0] && (
              <>
                <p className="bold">{latestWeather?.humidity}%</p>
                <p>Humidity</p>
              </>
            )}
          </div>
          <div className="wind">
            {weatherData[0] && (
              <>
                <p className="bold">{latestWeather?.windSpeed} km/h</p>
                <p>Wind</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
