import { useEffect, useState } from "react"
import countryServices from './services/country'
import ShowCountries from "./components/showCountries"

function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [allData, setAllData] = useState([])

  useEffect(() => {
    countryServices.getAll()
      .then(response => {
        setAllData(response)
        setAllCountries(response.map(country => country.name.common))
        console.log(response)
      })
  }, [])

  const countriesMatching = search === '' ? null : allCountries.filter(country => country.toLowerCase().includes(search.toLocaleLowerCase()))

  const handleCountryChange = (event) => setSearch(event.target.value)

  return (
    <div>
      <p>find countries <input value={search} onChange={handleCountryChange}/></p>
      <ShowCountries countriesMatching={countriesMatching} allData={allData} />
    </div>
  )
}

export default App
