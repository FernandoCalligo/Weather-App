import { useState, useEffect } from 'react'
import './App.css'
function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const apiKey = "15a92effa51521367e9cdfa5b3ac5189";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
        setError(null);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };


  /* useEffect(() => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15a92effa51521367e9cdfa5b3ac5189&units=metric`).then(res => res.json()).then(data => {
      console.log(data)

      setdata(data)
      setweather(data.weather[0])

      console
    })
  
  }, [city]) */

  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={city} onChange={handleChange} type="text" placeholder='Ingresar Ciudad' />
      </form>
      {isLoading && <span className='loading'>Loading...</span>}
      {error && <div>{error}</div>}
      {weatherData.weather && (
        <div className='weather'>
          <div>
            <span className='temp'>{weatherData.main.temp} °C</span>
          </div>
          <div className="weathermain">
            <h2>{weatherData.name}</h2>
            <img
              src={`./src/assets/${weatherData.weather[0].main}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
          <div className='weatherinfo'>
            <span><strong>Humedad: </strong>{weatherData.main.humidity}%</span>
            <span><strong>Sensación real: </strong>{weatherData.main.feels_like} °C</span>
            <span><strong>Presión: </strong>{weatherData.main.pressure}mbar</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
