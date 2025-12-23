import { useEffect, useState } from "react"
import countryServices from './services/country'
import ShowCountries from "./components/showCountries"

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState([])

  useEffect(() => {
    countryServices.getAll()
      .then(response => {
        setAllData(response)
        console.log(response)
      })
  }, [])

  const countriesMatching = search === '' ? null : allData.filter(country => country.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  const handleCountryChange = (event) => setSearch(event.target.value)

  return (
    <div>
      <p>find countries <input value={search} onChange={handleCountryChange}/></p>
      <ShowCountries countriesMatching={countriesMatching} setSearch={setSearch} />
    </div>
  )
}

export default App
