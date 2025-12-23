const ShowCountries = ({ countriesMatching, setSearch }) => {
    console.log(countriesMatching)
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
        const oneCountry = countriesMatching[0]
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
                {countriesMatching.map(country => 
                    <p>{country.name.common} <button key={country.name.common} onClick={() => setSearch(country.name.common)} >Show</button></p>
                )}
            </div>
        )
    }
}

export default ShowCountries