import { useState } from 'react'
import Filter from './components/Filter'
import ShowPersons from './components/ShowPersons'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = { 
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }

    if (persons.some(person => person.name === newObject.name)) {
      alert(`${newObject.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewFilter = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow} />
    </div>
  )
}

export default App