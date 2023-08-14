//import react from "react";
import "./WeatherForecastDay.css";

export default function WeatherForecastDay(props) {
	return (
		<div className="WeatherForecastDay">
			<div>
				<span>{props.date}</span>
				<br />

				<br />
				<span className="next-temp-max">{Math.round(props.maxtemp)}°C</span>
				<br />
				<span className="next-temp-min">{Math.round(props.mintemp)}°C</span>
			</div>
		</div>
	);
}
//	<img id="day-0-icon" src={props.icon} alt="Clear" width="50px" className="next-day-icon" />
