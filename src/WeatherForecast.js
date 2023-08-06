//import react from "react";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
	return (
		<div className="next-days">
			<div>
				<span id="nextDate-0">{props.date}</span>
				<br />
				<img id="day-0-icon" src={props.icon} alt="Clear" width="50px" className="next-day-icon" />
				<br />
				<span className="next-temp-max">
					<span id="nextTempMax-0">{Math.round(props.maxtemp)}</span>°C
				</span>
				<br />
				<span className="next-temp-min">
					<span id="nextTempMin-0">{Math.round(props.mintemp)}</span>°C
				</span>
			</div>
		</div>
	);
}
