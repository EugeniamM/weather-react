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
	let [weatherData, setWeatherData] = useState({ unitName: "metric" });
	let [loaded, setLoaded] = useState(false);

	//current date and time
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const apiKey = "281450ec88936f4fa8ee9864682b49a0";

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

	//set weather info
	function setCityInfo(response) {
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
			unitName: weatherData.unitName,
			updateTime: getDateString(new Date(response.data.dt * 1000)),
			lat: response.data.coord.lat,
			lon: response.data.coord.lon,
		});
		setLoaded(true);
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
				lat: weatherData.lat,
				lon: weatherData.lon,
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
				lat: weatherData.lat,
				lon: weatherData.lon,
			});
		}
	}

	if (loaded) {
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
						<form className="d-flex mt-1 justify-content-center w-100" role="search" onSubmit={searchFunc}>
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

					<div className="row align-items-center">
						<div className="col-7">
							<img src={weatherData.icon} alt="Clear" />
							<span className="main-temp">{Math.round(weatherData.temperature)}&nbsp;</span>
							<span className="units">
								<span className={weatherData.unitName === "metric" ? "currentUnit" : "tempUnit"} onClick={changeToMetric}>
									°C
								</span>
								&nbsp;|&nbsp;
								<span className={weatherData.unitName !== "metric" ? "currentUnit" : "tempUnit"} onClick={changeToFahrenheit}>
									°F
								</span>
							</span>
						</div>

						<div className="col-5 main-info align-items-center p-4">
							<b>Humidity</b>: {weatherData.humidity}%
							<br />
							<b>Wind:</b> {weatherData.wind} km/h
							<br />
							<span className="text-capitalize">{weatherData.description}</span>
						</div>
					</div>

					<WeatherForecast lat={weatherData.lat} lon={weatherData.lon} unitName={weatherData.unitName} />
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
	} else {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.defcity}&appid=${apiKey}&units=${weatherData.unitName}`;
		axios.get(url).then(setCityInfo).catch(getCityInfoError);

		return (
			<div className="Weather">
				<div className="container mainPanel">"Loading"</div>
			</div>
		);
	}
}
