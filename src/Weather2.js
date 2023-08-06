import React, { useState } from "react";
import axios from "axios";

import "./Weather2.css";

import WeatherForecast from "./WeatherForecast";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Weather2(props) {
	//
	let [city, setCity] = useState("");
	let [weatherData, setWeatherData] = useState({ unitName: "metric", loaded: false });
	let [forecastData, setForecastData] = useState([{}]);

	//current date and time
	//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	//const shortMonths = [ "Jan", "Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec",];

	//const apiKey = "281450ec88936f4fa8ee9864682b49a0";
	const unitName = `metric`;
	const apiKey = "6782253072f7d90462731a624097fc54";

	//changing city name
	function changeCity(event) {
		setCity(event.target.value);
	}

	// current date and time from Data();
	function getDateString(dataInfo) {
		return (
			dataInfo.getDate() +
			" " +
			months[dataInfo.getMonth()] +
			" " +
			(dataInfo.getHours() < 10 ? `0${dataInfo.getHours()}` : dataInfo.getHours()) +
			":" +
			(dataInfo.getMinutes() < 10 ? `0${dataInfo.getMinutes()}` : dataInfo.getMinutes())
		);
	}

	//forecastinfo
	function setForecastInfo(response) {
		setForecastData([
			{
				min: response.data.daily[0].temp.min,
				max: response.data.daily[0].temp.max,
				icon: `https://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
			},
			{
				min: response.data.daily[1].temp.min,
				max: response.data.daily[1].temp.max,
				icon: `https://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`,
			},
			{
				min: response.data.daily[2].temp.min,
				max: response.data.daily[2].temp.max,
				icon: `https://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`,
			},
			{
				min: response.data.daily[3].temp.min,
				max: response.data.daily[3].temp.max,
				icon: `https://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`,
			},
			{
				min: response.data.daily[4].temp.min,
				max: response.data.daily[4].temp.max,
				icon: `https://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`,
			},
		]);
	}

	function getForecastInfoError() {
		alert("Error");
	}
	//set weather info
	function setCityInfo(response) {
		console.log(response.data);
		setWeatherData({
			city: response.data.name,
			temperature: response.data.main.temp,
			mintemp: response.data.main.temp_min,
			maxtemp: response.data.main.temp_max,
			feelslike: response.data.main.feels_like,
			wind: response.data.wind.speed,
			humidity: response.data.main.humidity,
			icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
			description: response.data.weather[0].description,
			loaded: true,
			unitName: weatherData.unitName,
			updateTime: getDateString(new Date(response.data.dt * 1000)),
		});

		//console.log(response.data.);
		//	response.date.coords.latitude;
		//	response.date.coords.longitude;
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=${weatherData.unitName}`;
		axios.get(url).then(setForecastInfo).catch(getForecastInfoError);
	}

	function getCityInfo(cityName) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${weatherData.unitName}`;
		axios.get(url).then(setCityInfo).catch(getCityInfoError);
	}

	// if weather no loaded
	function getCityInfoError() {
		alert("Error");
	}

	//load weather info after submit press
	function searchFunc(event) {
		event.preventDefault();
		getCityInfo(city);
	}
	function getInfoByPosition(position) {
		let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${weatherData.unitName}`;
		axios.get(apiUrl1).then(setCityInfo).catch(getCityInfoError);
	}

	function getCurrentLocation() {
		navigator.geolocation.getCurrentPosition(getInfoByPosition);
	}
	function changeToMetric() {
		if (weatherData.unitName === "imperial") {
			setWeatherData({
				temperature: ((weatherData.temperature - 32) * 5) / 9,
				mintemp: ((weatherData.mintemp - 32) * 5) / 9,
				maxtemp: ((weatherData.maxtemp - 32) * 5) / 9,
				feelslike: ((weatherData.feelslike - 32) * 5) / 9,
				unitName: "metric",
				city: weatherData.city,
				wind: weatherData.wind,
				humidity: weatherData.humidity,
				icon: weatherData.icon,
				description: weatherData.description,
				loaded: true,
				updateTime: weatherData.updateTime,
			});
		}
	}
	function changeToFahrenheit() {
		if (weatherData.unitName === "metric") {
			setWeatherData({
				temperature: (weatherData.temperature * 9) / 5 + 32,
				mintemp: (weatherData.mintemp * 9) / 5 + 32,
				maxtemp: (weatherData.maxtemp * 9) / 5 + 32,
				feelslike: (weatherData.feelslike * 9) / 5 + 32,
				unitName: "imperial",
				city: weatherData.city,
				wind: weatherData.wind,
				humidity: weatherData.humidity,
				icon: weatherData.icon,
				description: weatherData.description,
				loaded: true,
				updateTime: weatherData.updateTime,
			});
		}
	}

	if (weatherData.loaded === false) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.defcity}&appid=${apiKey}&units=${unitName}`;
		axios.get(url).then(setCityInfo).catch(getCityInfoError);

		return (
			<div className="Weather">
				<div className="container mainPanel">"Loading"</div>
			</div>
		);
	}

	return (
		<div className="Weather">
			<div className="container mainPanel">
				<div className="d-flex justify-content-between ">
					<div className="current-city" onClick={getCurrentLocation}>
						Current city{" "}
					</div>
					<div className="current-city" onClick={() => getCityInfo("Odessa")}>
						Odessa{" "}
					</div>
					<div className="current-city" onClick={() => getCityInfo("London")}>
						London{" "}
					</div>
					<div className="current-city" onClick={() => getCityInfo("Lisbon")}>
						Lisbon{" "}
					</div>
				</div>
				<div className="container p-0">
					<form className="d-flex mt-1 justify-content-center w-100" role="search" id="search-form" onSubmit={searchFunc}>
						<input
							className="form-control searchInput w-100"
							type="search"
							placeholder="Enter a city name"
							aria-label="newCity"
							onChange={changeCity}
						/>
						<button className="btn btn-outline-warning searchBtn" type="submit">
							<i className="fa-solid fa-magnifying-glass searchIcon"></i>
						</button>
					</form>
				</div>
				<h1 className="city-name">{weatherData.city}</h1>

				<div className="main-info">
					<b>Update time: </b>
					{weatherData.updateTime}
					<br />
					<b> Feels like:</b> {Math.round(weatherData.feelslike)}°C <b> Min: </b>
					{Math.round(weatherData.mintemp)}°C <b> Max: </b>
					{Math.round(weatherData.maxtemp)}°C{" "}
				</div>

				<div className=" d-flex  justify-content-between align-items-center">
					<div>
						<img src={weatherData.icon} alt="Clear" />
						<span className="main-temp">{Math.round(weatherData.temperature)}</span>
						<span className="units">
							<span className={weatherData.unitName === "metric" ? "currentUnit" : "tempUnit"} onClick={changeToMetric}>
								°C
							</span>{" "}
							|{" "}
							<span className={weatherData.unitName !== "metric" ? "currentUnit" : "tempUnit"} onClick={changeToFahrenheit}>
								°F
							</span>
						</span>
					</div>

					<div className="mr-4">
						<div className="main-info">
							<b>Humidity</b>: {weatherData.humidity}%
							<br />
							<b>Wind:</b> {weatherData.wind} km/h
							<br />
							<span className="text-capitalize">{weatherData.description}</span>
						</div>
					</div>
				</div>

				<div className=" d-flex justify-content-between">
					{console.log(forecastData)}
					<WeatherForecast mintemp={forecastData[0].min} maxtemp={forecastData[0].max} date="18 sept" icon={forecastData[0].icon} />
					<WeatherForecast mintemp={forecastData[1].min} maxtemp={forecastData[1].max} date="18 sept" icon={forecastData[1].icon} />
				</div>
			</div>
			<footer>
				<a href="https://github.com/EugeniamM/weather-react.git" target="_blanc">
					Open-source code
				</a>{" "}
				from{" "}
				<a href="https://super-babka-75dc22.netlify.app" target="_blanc">
					Ievgeniia Mukhamet
				</a>
			</footer>
		</div>
	);
}
/*						<WeatherForecast mintemp={forecastData[1].min} maxtemp={forecastData[1].max} date="18 sept" icon={forecastData[1].icon} />

						<WeatherForecast mintemp={forecastData[2].min} maxtemp={forecastData[2].max} date="18 sept" icon={forecastData[2].icon} />

						<WeatherForecast mintemp={forecastData[3].min} maxtemp={forecastData[3].max} date="18 sept" icon={forecastData[3].icon} />*/
