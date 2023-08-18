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
		alert("Error in forecast call");
	}

	if (loaded) {
		return (
			<div className=" d-flex  justify-content-between align-items-center">
				{forecastData.map(function (dailyForecast, index) {
					//if (index < 6) {
					//console.log(dailyForecast);
					return <WeatherForecastDay mintemp={dailyForecast.min} maxtemp={dailyForecast.max} date="18 sept" icon={dailyForecast.icon} />;
					//}
				})}
			</div>
		);
	} else {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&appid=${apiKey}&units=${props.unitName}`;
		console.log(url);
		axios.get(url).then(setForecastInfo).catch(getForecastInfoError);
		return "Loading";
	}
}
//	<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" icon="01d.png" />
//<WeatherForecast mintemp={dailyForecast.min} maxtemp={dailyForecast.max} date="18 sept" icon={dailyForecast.icon} />
