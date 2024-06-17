import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp(){
    let [weather, setWeather] = useState({
        city: "Delhi",
        feelsLike: 39.76,
        humidity: 51,
        temp: 34.45,
        tempMax: 34.45,
        tempMin: 34.45,
        weather: "overcast clouds"
    });

    let updateInfo = (newInfo)=>{
        setWeather(newInfo);
    };

    return (
        <div className="container">
            <h2><u>Weather App</u></h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weather}/>
        </div>
    );
}