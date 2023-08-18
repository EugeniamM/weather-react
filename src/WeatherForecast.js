import { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
	const apiKey = "281450ec88936f4fa8ee9864682b49a0";
	let [forecastData, setForecastData] = useState([{}]);
	let [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
	}, [props]);

	//forecastinfo
	function setForecastInfo(response) {
		setLoaded(true);
		setForecastData([
			{
				min: response.data.daily[0].temp.min,
				max: response.data.daily[0].temp.max,
				date: new Date(response.data.daily[0].dt * 1000),
				icon: `https://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
				descr: response.data.daily[0].weather[0].main,
			},
			{
				min: response.data.daily[1].temp.min,
				max: response.data.daily[1].temp.max,
				date: new Date(response.data.daily[1].dt * 1000),
				icon: `https://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`,
				descr: response.data.daily[1].weather[0].main,
			},
			{
				min: response.data.daily[2].temp.min,
				max: response.data.daily[2].temp.max,
				date: new Date(response.data.daily[2].dt * 1000),
				icon: `https://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`,
				descr: response.data.daily[2].weather[0].main,
			},
			{
				min: response.data.daily[3].temp.min,
				max: response.data.daily[3].temp.max,
				date: new Date(response.data.daily[3].dt * 1000),
				icon: `https://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`,
				descr: response.data.daily[3].weather[0].main,
			},
			{
				min: response.data.daily[4].temp.min,
				max: response.data.daily[4].temp.max,
				date: new Date(response.data.daily[4].dt * 1000),
				icon: `https://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`,
				descr: response.data.daily[4].weather[0].main,
			},
		]);
	}

	function getForecastInfoError() {
		alert("Error in forecast call");
	}

	if (loaded) {
		return (
			<div className="row align-items-center">
				{forecastData.map(function (dailyForecast, index) {
					return (
						<div className="col p-0">
							<WeatherForecastDay
								mintemp={dailyForecast.min}
								maxtemp={dailyForecast.max}
								date={dailyForecast.date}
								icon={dailyForecast.icon}
								descr={dailyForecast.descr}
							/>
						</div>
					);
				})}
			</div>
		);
	} else {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&cnt=5&appid=${apiKey}&units=${props.unitName}`;
		axios.get(url).then(setForecastInfo).catch(getForecastInfoError);
		return "Loading";
	}
}
