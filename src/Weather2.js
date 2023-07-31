import React, { useState } from "react";
import axios from "axios";

import "./Weather2.css";

//import Forecast from "./Forecast";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Weather2() {
	//
	let [city, setCity] = useState("");

	let [loaded, setLoaded] = useState(false);
	let [weatherData, setWeatherData] = useState({});
	//let [currentDate, setCurrentDate] =useState("");
	let [currentTime, setCurrentTime] = useState("");
	let [updateTime, setUpdateTime] = useState("");
//	let [currentMetric, setCurrentMetric] = "C";
/	let currentMetric = "C";

	
	//current date and time
	//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	//const shortMonths = [
	// "Jan",
	// "Feb",
	//"Mar",
	//"Apr",
	//"May",
	//"Jun",
	// "Jul",
	//"Aug",
	//"Sep",
	//"Oct",
	//"Nov",
	//"Dec",
	//];

	const apiKey = "281450ec88936f4fa8ee9864682b49a0";
	const unitName = `metric`;
	//const apiKey2 = "6782253072f7d90462731a624097fc54";

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
			(dataInfo.getHours() < 10
				? `0${dataInfo.getHours()}`
				: dataInfo.getHours()) +
			":" +
			(dataInfo.getMinutes() < 10
				? `0${dataInfo.getMinutes()}`
				: dataInfo.getMinutes())
		);
	}
	//  const selDateTime = new Date(response.data.dt * 1000);
	//set weather info
	function getCityInfo(response) {
		//const localDate = new Date();
		//const updDate = new Date(response.data.dt * 1000);

		setCurrentTime(getDateString(new Date()));
		setUpdateTime(getDateString(new Date(response.data.dt * 1000)));

		setLoaded(true);
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
		});
	}

	// if weather no loaded
	function getCityInfoError() {
		alert("Error");
	}

	//load weather info after submit press
	function searchFunc(event) {
		event.preventDefault();
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitName}`;
		axios.get(url).then(getCityInfo).catch(getCityInfoError);
	}
	/*
	function getInfoByPosition(position) {
		let unitName = "metric";
		if (currentMetric === "F") {
			unitName = "imperial";
		}

		let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unitName}`;
		axios.get(apiUrl1).then(getCityInfo).catch(getCityInfoError);
	}

	function currentCityHandler() {
		navigator.geolocation.getCurrentPosition(getInfoByPosition);
	}
*/
	function getInfoByPosition(position) {
		let unitName = "metric";
		if (currentMetric === "F") {
			unitName = "imperial";
		}

		let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unitName}`;
		axios.get(apiUrl1).then(getCityInfo).catch(getCityInfoError);
	}

	function getCurrentLocation() {
		navigator.geolocation.getCurrentPosition(getInfoByPosition);
	}

	if (!loaded) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=Odesa&appid=${apiKey}&units=${unitName}`;
		axios.get(url).then(getCityInfo).catch(getCityInfoError);
	}

	return (
		<div className="Weather">
			<div className="container mainPanel">
				<div className="d-flex  justify-content-between ">
					<div
						className="current-city"
						id="current-city-link"
						onClick={getCurrentLocation}
					>
						Current city
					</div>
					<div className="current-date-time" id="current-data-time">
						{currentTime}
					</div>
				</div>
				<div className="container p-0">
					<form
						className="d-flex mt-1 justify-content-center w-100"
						role="search"
						id="search-form"
						onSubmit={searchFunc}
					>
						<input
							className="form-control searchInput w-100"
							type="search"
							placeholder="Enter a city name"
							aria-label="newCity"
							id="inputCity"
							onChange={changeCity}
						/>
						<button className="btn btn-outline-warning searchBtn" type="submit">
							<i className="fa-solid fa-magnifying-glass searchIcon"></i>
						</button>
					</form>
				</div>
				<h1 className="city-name" id="sel-city">
					{weatherData.city}
				</h1>

				<div className="main-info">
					<span id="sel-date-time"> {updateTime}</span>
					<br />
					<span>
						<b> Feels like:</b>{" "}
						<span id="feels-like">{weatherData.feelslike}</span>°
						<span id="feels-like-unit">C</span>
					</span>
					<span>
						{" "}
						<b>Min: </b>
						<span id="min-temp"> {weatherData.mintemp}</span>°
						<span id="min-temp-unit">C</span>{" "}
					</span>
					<span>
						{" "}
						<b>Max: </b>
						<span id="max-temp"> {weatherData.maxtemp}</span>°
						<span id="max-temp-unit">C</span>{" "}
					</span>
				</div>

				<div className=" d-flex  justify-content-between align-items-center">
					<div>
						<img id="main-icon" src={weatherData.icon} alt="Clear" />
						<span className="main-temp">
							<span id="sel-temp"> {Math.round(weatherData.temperature)}</span>
						</span>
						<span className="units">
							<span id="celsius" className="currTempUnit">
								°C
							</span>
							<span> | </span>
							<span id="fahrenheit" className="tempUnit">
								°F
							</span>
						</span>
					</div>

					<div className="mr-4">
						<div className="main-info">
							<span id="sel-humidity">
								<b>Humidity</b>: {weatherData.humidity}%
							</span>
							<br />
							<span id="sel-wind">
								<b>Wind:</b> {weatherData.wind} km/h
							</span>
							<br />
							<span id="description"> {weatherData.description}</span>
						</div>
					</div>
				</div>
			</div>
			<p>
				<a href="https://github.com/EugeniamM/weather-react.git" target="blanc">
					Open-source code
				</a>{" "}
				from{" "}
				<a href="https://super-babka-75dc22.netlify.app" target="blanc">
					Ievgeniia Mukhamet
				</a>
			</p>
		</div>
	);
}

/*<div className=" d-flex justify-content-between">
					<Forecast
						mintemp="18"
						maxtemp="24"
						date="18 sept"
						icon="https://openweathermap.org/img/wn/01d@2x.png"
					/>

					<Forecast
						mintemp="15"
						maxtemp="22"
						date="19 sept"
						icon="https://openweathermap.org/img/wn/01d@2x.png"
					/>

					<Forecast
						mintemp="14"
						maxtemp="24"
						date="20 sept"
						icon="https://openweathermap.org/img/wn/01d@2x.png"
					/>

					<Forecast
						mintemp="10"
						maxtemp="22"
						date="21 sept"
						icon="https://openweathermap.org/img/wn/01d@2x.png"
					/>
				</div>*/
