import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_key = "f7a943bf225554908068b549bb20c2f1";

    let getWeatherInfo = async ()=>{
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_key}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                tempMax: jsonResponse.main.temp_max,
                tempMin: jsonResponse.main.temp_min,
                weather: jsonResponse.weather[0].description
            };
            return result;
        } catch(err){
            throw err;
        }
    };

    let handleChange = (event)=>{
        setCity(event.target.value);
    };

    let handleSubmit = async (event)=>{
        try{
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false);
        } catch(err){
            setError(true);
        };
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required onChange={handleChange} value={city}/>
                <br></br>
                <br></br>
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{color: "red", fontWeight: "bold"}}>No such place exists in API</p>}
            </form>
        </div>
    );
}; 