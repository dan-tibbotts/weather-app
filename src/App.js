import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHERMAP_APIKEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          type="text"
          placeholder="Enter Location"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed(1)}°C</h1>}
          </div>
          <div className="description">
            <p>{data.weather && data.weather[0].main}</p>
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main && data.main.feels_like.toFixed(1) + "°C"}
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main && data.main.humidity.toFixed(1) + "%"}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind && data.wind.speed.toFixed(1) + "m/s"}
              </p>
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
