import './App.css';
import { useState } from 'react';


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '80769f825bmshb74bd7963dfb6a8p1b8d8djsnaa0e7650efa1',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

function App() {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('');
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  function search(evt) {
    if (evt.key === 'Enter')
      fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`, options)
        .then(response => response.json())
        .then(response => {
          if (response.location) {
            setWeather(response);
            console.log(response)
            setQuery('');
          }
        })
        .catch(err => console.error('errrr',err));
  }


  return (
    
    <div className="App">
      <input
        onChange={e => setQuery(e.target.value)}
        className='search-bar'
        type='text'
        placeholder='Search for a city... '
        value={query}
        onKeyPress={search}>
      </input>
      <div className='weather-box'>
      {weather && <div>
        <h1 className='date'>{date}</h1>
        <img src={weather.current.condition.icon}></img>
        <h1 className='town'>{weather.location.name}</h1>
        <h1 className='temp'>{weather.current.temp_c}°C</h1>
        <h3>Feels like: {weather.current.feelslike_c}°C</h3>
        <h3>Humidity: {weather.current.humidity}%</h3>
        <h1 className='condition'>{weather.current.condition.text}</h1>
      </div>}
      </div>
     
    </div>
  );
}

export default App;
