//import react from "react";
import "./WeatherForecastDay.css";

export default function WeatherForecastDay(props) {
	const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// current date and time from Data();
	function getDateString(dataInfo) {
		return (
			dataInfo.getDate() + " " + shortMonths[dataInfo.getMonth()] //+
			//	" " +
			//	(dataInfo.getHours() < 10 ? `0${dataInfo.getHours()}` : dataInfo.getHours()) +
			//":" +
			//(dataInfo.getMinutes() < 10 ? `0${dataInfo.getMinutes()}` : dataInfo.getMinutes())
		);
	}

	return (
		<div className="WeatherForecastDay">
			<div>
				<span>{getDateString(props.date)}</span>
				<br />
				<img src={props.icon} alt={props.descr} width="50px" className="next-day-icon" />
				<br />
				<span className="next-temp-max">{Math.round(props.maxtemp)}°C</span>
				<br />
				<span className="next-temp-min">{Math.round(props.mintemp)}°C</span>
			</div>
		</div>
	);
}
