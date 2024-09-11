import { useEffect, useState } from 'react'
import Filter from './Filter'
import Countries from './Countries'
import Country from './Country'
import apiService from './services/apiService'

function isEmpty(value) {
  // Check if value is null or undefined
  if (value == null) {
    return true;
  }
  // Convert the value to a string if it's not (to handle numbers, booleans, etc.)
  const str = String(value);

  // Check if the string is empty or contains only whitespace
  return str.trim() === "";
}

const App = () => {
  const [countries, setCountries] = useState(null) 

  useEffect(() => {
    const getCountries = apiService.getCountries()
    getCountries.then(response=>{
      const mappedCountries = response.map(country=>({
        countryName: country.name.official,
        countryCapital: country.capital,
        countryLanguage: country && country.languages?Object.values(country.languages):null,
        countryFlag: country && country.flags?Object.values(country.flags):null,
        countryArea: country.area
      }));
      setCountries(mappedCountries)
      console.log("mappedCountries",mappedCountries)
      console.log("countries",countries)
    })
  }, [])
  const [countryFilter, setCountryFilter] = useState('')
  
  const onCountryFilterHandler = (event) => {
    event.preventDefault();
    setCountryFilter(event.target.value)
  }

  if(countries){
    const countryFilteredArray = isEmpty(countryFilter) ? countries.slice(-10) : countries.filter((country) => (country.countryName.toLowerCase().includes(countryFilter.toLowerCase())) )
    const isFilteredCountryLengthGreaterThan10 = countryFilteredArray.length>10;
    const isOneElmentInCountryArray = countryFilteredArray.length == 1;
    return (
      <div>
        <Filter label={'find countries'} items={{countryFilter, handler: onCountryFilterHandler}}/>
        {isFilteredCountryLengthGreaterThan10 ? <p>Too many matches,specify another filter</p> : isOneElmentInCountryArray ? <Country item={countryFilteredArray[0]}/> :<Countries items={countryFilteredArray}/>}
      </div>
    )
  }
}

export default App