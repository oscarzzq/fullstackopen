import { useState } from 'react'
import countriesService from '../services/country'


const ShowCountries = ({ countriesMatching, allData }) => {
    if (countriesMatching === null) {
        return
    }
    else if (countriesMatching.length > 10 ) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    else if (countriesMatching.length === 1) {
        const oneCountry = allData.filter(country => country.name.common === countriesMatching[0])[0]
        console.log(oneCountry)
        return (
            <div>
                <h1>{oneCountry.name.common}</h1>
                <p>Capital {oneCountry.capital}</p>
                <p>Area {oneCountry.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(oneCountry.languages).map(language => <li>{language}</li>)}
                </ul>
                <img src={oneCountry.flags.png} width='200' />
                
            </div>
        )
    }
    else {
        return (
            <div>
                {countriesMatching.map(country => <p>{country}</p>)}
            </div>
        )
    }
}

export default ShowCountries