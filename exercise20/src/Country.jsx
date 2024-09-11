import apiService from './services/apiService'
import { useEffect, useState } from 'react'

const Country = ({ item }) => { 
    
  const [country, setCountry] = useState(item) 
useEffect(() => {
    console.log("--country: ", country)
    if(country.countryLatLng){
        const fetchWeatherData = async () => {
            try {
                const weatherResponse = await apiService.getCountryWeather(country.countryLatLng.lat, country.countryLatLng.lon);
    
                // Update the country state with the weather data
                setCountry(prevCountry => ({
                    ...prevCountry,
                    temperature: weatherResponse?.main?.temp,
                    iconURL: `https://openweathermap.org/img/wn/${weatherResponse?.weather[0]?.icon}@2x.png`,
                    wind: weatherResponse?.wind?.speed,
                }));
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };
    
        fetchWeatherData();
    }
}, [country.countryLatLng]);
    if(country){
    return (
        <>
            <h1>{country.countryName}</h1>
            <p>
                {country.countryCapital}
            </p>
            <p>
                {country.countryArea}
            </p>
            <b>languages:</b>{country.countryLanguage.map((element, i) => (<li key={i} style={{ paddingLeft: "20px" }}>{element}</li>))}
            <img src={country.countryFlag[0]} />
            <h1>Weather in {country.countryCapital}</h1>
            <p>
            temperature {country.temperature} Celsius
            </p>
            <img src={country.iconURL}/>
            <p>
            wind {country.wind} m/s
                </p>
        </>
    )}
}

export default Country