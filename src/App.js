import React, { useState } from "react";
import { dateBuilder } from "./util/DateBuilder";
import { stateFinder } from "./util/StateFinder";

const api = {
  key: '818a4d5f46a985b7c158ee155d6615c2',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [state, setState] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      if (Number(query)) {
        fetch(`${api.base}weather?zip=${query},us&appid=${api.key}&units=imperial`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setState(`${stateFinder(query)}, `);
          console.log(result);
        });
      } else {
        fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=imperial`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setState('');
          console.log(result);
        });
      }
    }
  }

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > (40)) ? 'app warm' : 'app cold') : 'app cold'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Zip Code or City..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {state}{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  )
}

export default App;
