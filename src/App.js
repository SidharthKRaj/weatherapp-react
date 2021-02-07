import './App.css';
import axios from 'axios'
import { useState } from 'react';

const API_KEY = '5f0ec8963df886225936b9cf132b0690'

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  let climate = 'normal';
  let temper = '';
  if (weather && weather.main) { temper = weather.main.temp }
  if (temper > 35) {
    climate = 'hot';
  } else if (temper < 10) {
    climate = 'cold';
  } else {
    climate = 'normal';
  }

  return (
    <div className={climate}>
        <div className="searchcontainer">
            <input type="text" className="search" placeholder="search city" onChange={updateSearhContent} onKeyPress={search}/>
            <button type='submit' className="submit" onClick={fetchWeather}>Search</button>
        </div>
        {
          typeof weather.main != "undefined" ? (
            <div className="weatherinfo">
                <div className="infobox">
                    <div className="temp">
                        <h1 id="city">{weather.name}, {weather.sys.country}</h1>
                        <h3 id="date">{new Intl.DateTimeFormat('en-US', { year:'numeric', month:'long', day:'numeric'} ).format((weather.dt)*1000)}</h3>
                        <h2 id="temperature">{weather.main.temp}°C</h2>
                        <h3 id='description'>{weather.weather[0].main}</h3>
                    </div>
                    <div className="other">
                        <div className="top">
                            <div className="one">
                                <h2 id='value'>{weather.wind.speed} m/s</h2>
                                <h4 id='param'>Windspeed</h4>
                            </div>
                            <div className="two">
                                <h2 id='value'>{weather.main.pressure} hPa</h2>
                                <h4 id='param'>Pressure</h4>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="three">
                                <h2 id='value'>{weather.main.humidity}%</h2>
                                <h4 id='param'>Humidity</h4>
                            </div>
                            <div className="four">
                                <h2 id='value'>{weather.wind.deg}°</h2>
                                <h4 id='param'>wind direction</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ) : null
        }
    </div>
  );

  function updateSearhContent(event) {
    setQuery(event.target.value);
  }

  function search(event) {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  }

  function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then((response) => {
      setWeather(response)
      console.log(weather);
    })
  }
}

export default App;
