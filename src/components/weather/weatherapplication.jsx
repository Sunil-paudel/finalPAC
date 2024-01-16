import React, { useState } from "react";
import { Input, Button, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import {
  faSun,
  faMoon,
  faCloud,
  faCloudRain,
  faCloudSun,
  faCloudMoon,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
const WEATHER_API = process.env.WEATHER_API;

const Container = styled.div`
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   @media (max-width: 600px) {
  WeatherDataTable,
  ForecastTable {
    display: block;
    overflow-x: auto;
  }

  WeatherTableHeader,
  WeatherTableCell,
  TableHeader,
  TableCell {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
}
`;

const Heading = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  flex: 1;
  padding: 20px;
  margin: auto;
  font-size: 20px;
  border: 2px solid #007bff; /* Add a border */
  border-radius: 8px; /* Rounded corners */
  outline: none; /* Remove input outline on focus */
  transition: border-color 0.2s ease-in-out; /* Smooth border transition */
  &:focus {
    border-color: #ff5733; /* Change border color on focus */
  }
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 18px;
  outline: none;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 18px;
`;

const ForecastContainer = styled.div`
  margin-top: 20px;
`;

const ForecastTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: -moz-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);
  border-radius: 10px;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 4px;
  color: white;
  background-color: #007bff;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 4px;
`;

const WeatherIcon = styled.div`
  color: blue;
`;

const WeatherDataContainer = styled.div`
  margin-top: 20px;
`;

const WeatherDataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: -moz-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);
  border-radius: 10px;
`;

const WeatherTableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 4px;
  color: white;
  background-color: #007bff;
`;

const WeatherTableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin: 4px;
`;

const kelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

// Define the getWeatherIcon function
const getWeatherIcon = (iconCode) => {
  // Implement this function based on your icon library or source
  // For example, you can use FontAwesome icons as shown below:
  switch (iconCode) {
    case "01d":
      return <FontAwesomeIcon icon={faSun} />;
    case "01n":
      return <FontAwesomeIcon icon={faMoon} />;
    case "02d":
    case "02n":
      return <FontAwesomeIcon icon={faCloudSun} />;
    case "03d":
    case "03n":
      return <FontAwesomeIcon icon={faCloud} />;
    case "04d":
    case "04n":
      return <FontAwesomeIcon icon={faCloud} />;
    case "09d":
    case "09n":
      return <FontAwesomeIcon icon={faCloudRain} />;
    case "10d":
    case "10n":
      return <FontAwesomeIcon icon={faCloudSun} />;
    case "11d":
    case "11n":
      return <FontAwesomeIcon icon={faCloudMoon} />;
    case "13d":
    case "13n":
      return <FontAwesomeIcon icon={faSnowflake} />;
    case "50d":
    case "50n":
      return <FontAwesomeIcon icon={faSmog} />;
    default:
      return <div>Unknown</div>;
  }
};

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleGetWeatherAndForecast = () => {
    if (location.trim() !== "") {
      setLoading(true);
      setError(null);

      // Fetch current weather data for the entered location
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);

          // Fetch forecast data after getting weather data
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${WEATHER_API}`
          )
            .then((response) => response.json())
            .then((forecastData) => {
              const dailyForecastData = forecastData.list
                .filter((forecast) => forecast.dt_txt.includes("09:00:00"))
                .map((forecast) => ({
                  date: forecast.dt * 1000,
                  icon: forecast.weather[0].icon, // Use icon code here
                  description: forecast.weather[0].main,
                  temperature: (forecast.main.temp - 273.15).toFixed(2),
                }));

              setForecastData(dailyForecastData);
              setLoading(false);
            })
            .catch((forecastError) => {
              setError(forecastError.message);
              setLoading(false);
            });

        })


        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(`(${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);

        // Fetch weather data for the current location
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data);

            // Fetch forecast data for the current location
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}`
            )
              .then((response) => response.json())
              .then((forecastData) => {
                const dailyForecastData = forecastData.list
                  .filter((forecast) => forecast.dt_txt.includes("09:00:00"))
                  .map((forecast) => ({
                    date: forecast.dt * 1000,
                    icon: forecast.weather[0].icon, // Use icon code here
                    description: forecast.weather[0].main,
                    temperature: (forecast.main.temp - 273.15).toFixed(2),
                  }));

                setForecastData(dailyForecastData);
                setLoading(false);
              })
              .catch((forecastError) => {
                setError(forecastError.message);
                setLoading(false);
              });
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Location:", location);

      const requestBody = { location: location }; // Create the request body object
      const response = await fetch("/api/weathers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Stringify the request body
      });

      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Error sending data to the server.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container>
      <Heading>Weather App</Heading>
      <InputWrapper>
        <StyledInput
          placeholder="Enter location (e.g., city name)"
          value={location}
          onChange={handleLocationChange}
          style={{ padding: "30px", margin: "auto", fontSize: "20px" }} // Add inline styling here
        />
        <br></br>
        <StyledButton
          primary
          onClick={() => {
            handleGetWeatherAndForecast();
            handleSubmit();
          }}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px 24px",
            cursor: "pointer",
          }} // Add inline styling here
        >
          Get Weather and Forecast
        </StyledButton>
        <br></br>
        <Button
          secondary
          onClick={getCurrentLocation}
          style={{ padding: "16px", fontSize: "18px", margin: "auto" }}
        >
          Get Current Location weather update
        </Button>
      </InputWrapper>
      {loading ? (
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      ) : (
        <>
          {error && <Error>{error}</Error>}
          {weatherData.main && (
            <WeatherDataContainer>
              <h2>
                Weather in {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p>Current Location: {currentLocation}</p>
              <WeatherDataTable>
                <thead>
                  <tr>
                    <WeatherTableHeader>Date/Time</WeatherTableHeader>
                    <WeatherTableHeader>Icon</WeatherTableHeader>
                    <WeatherTableHeader>Description</WeatherTableHeader>
                    <WeatherTableHeader>Temperature</WeatherTableHeader>
                    <WeatherTableHeader>Humidity</WeatherTableHeader>
                    <WeatherTableHeader>Sunrise</WeatherTableHeader>
                    <WeatherTableHeader>Sunset</WeatherTableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <WeatherTableCell>
                      {new Date(weatherData.dt * 1000).toLocaleString()}
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {getWeatherIcon(weatherData.weather[0].icon)}
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {weatherData.weather[0].description}
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {kelvinToCelsius(weatherData.main.temp)}°C
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {weatherData.main.humidity}%
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                    </WeatherTableCell>
                    <WeatherTableCell>
                      {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                    </WeatherTableCell>
                  </tr>
                </tbody>
              </WeatherDataTable>
            </WeatherDataContainer>
          )}
          {forecastData.length > 0 && (
            <ForecastContainer>
              <ForecastTable>
                <thead>
                  <tr>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Temperature (°C)</TableHeader>
                    <TableHeader>Description</TableHeader>
                    <TableHeader>Weather Icon</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.map((forecastItem, index) => (
                    <tr key={index}>
                      <TableCell>
                        {moment(forecastItem.date).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>
                        {forecastItem.temperature}°C
                      </TableCell>
                      <TableCell>{forecastItem.description}</TableCell>
                      <TableCell>
                        <WeatherIcon>
                          {getWeatherIcon(forecastItem.icon)}
                        </WeatherIcon>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </ForecastTable>
            </ForecastContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default WeatherApp;
