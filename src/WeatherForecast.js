//import react from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
	//	console.log(url);
	//	const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.lat}&lon=${weatherData.lon}&appid=${apiKey}&units=${weatherData.unitName}`;
	//	axios.get(url2).then(setForecastInfo).catch(getForecastInfoError);
	//	console.log(url2);
	return (
		<div className=" d-flex  justify-content-between align-items-center">
			<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" />
			<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" />
			<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" />
			<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" />
			<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" />
		</div>
	);
}
//	<WeatherForecastDay mintemp="10" maxtemp="12" date="18 sept" icon="01d.png" />
//<WeatherForecast mintemp={forecastData[1].min} maxtemp={forecastData[1].max} date="18 sept" icon={forecastData[1].icon} />
