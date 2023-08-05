import React, { useState } from "react";
import axios from "axios";

import "./Weather2.css";

//import Forecast from "./Forecast";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Weather2(props) {
	//
	let [city, setCity] = useState("");

	let [loaded, setLoaded] = useState(false);
	let [weatherData, setWeatherData] = useState({});
	//let [currentDate, setCurrentDate] =useState("");
	//	let [currentTime, setCurrentTime] = useState("");
	let [updateTime, setUpdateTime] = useState({ unitName: "metric" });
	//	let [currentMetric, setCurrentMetric] = "C";
	let currentMetric = "C";

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

	//set weather info
	function setCityInfo(response) {
		//	setCurrentTime(getDateString(new Date()));
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
	function getCityInfo(cityName) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unitName}`;
		axios.get(url).then(setCityInfo).catch(getCityInfoError);
		console.log(cityName);
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
		let unitName = "metric";
		if (currentMetric === "F") {
			unitName = "imperial";
		}

		let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unitName}`;
		axios.get(apiUrl1).then(setCityInfo).catch(getCityInfoError);
	}

	function getCurrentLocation() {
		navigator.geolocation.getCurrentPosition(getInfoByPosition);
	}

	if (!loaded) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.defcity}&appid=${apiKey}&units=${unitName}`;
		axios.get(url).then(setCityInfo).catch(getCityInfoError);
		console.log(props.defcity);
		return (
			<div className="Weather">
				<div className="container mainPanel">"Loading"</div>
			</div>
		);
	} else
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
						<b>Update time:</b>
						{updateTime}
						<br />
						<b> Feels like:</b> {weatherData.feelslike}°C <b>Min: </b>
						{weatherData.mintemp}°C <b>Max: </b>
						{weatherData.maxtemp}°C{" "}
					</div>

					<div className=" d-flex  justify-content-between align-items-center">
						<div>
							<img src={weatherData.icon} alt="Clear" />
							<span className="main-temp">{Math.round(weatherData.temperature)}</span>
							<span className="units">
								<span className="currTempUnit">°C</span> | <span className="tempUnit">°F</span>
							</span>
						</div>

						<div className="mr-4">
							<div className="main-info">
								<b>Humidity</b>: {weatherData.humidity}%
								<br />
								<b>Wind:</b> {weatherData.wind} km/h
								<br />
								{weatherData.description}
							</div>
						</div>
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
