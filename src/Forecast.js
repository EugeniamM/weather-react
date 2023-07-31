//import react from "react";

export default function Forecast(props) {
  return (
    <div className="next-days">
      <div>
        <span id="nextDate-0">{props.date}</span>
        <br />
        <img
          id="day-0-icon"
          src={props.icon}
          alt="Clear"
          width="50px"
          className="next-day-icon"
        />
        <br />
        <span className="next-temp-max">
          <span id="nextTempMax-0">{props.mintemp}</span>°C
        </span>
        <br />
        <span className="next-temp-min">
          <span id="nextTempMin-0">{props.maxtemp}</span>°C
        </span>
      </div>
    </div>
  );
}
