import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import ShowPersons from './components/ShowPersons'
import Form from './components/Form'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [noteType, setNoteType] = useState('')
  const [notification, setNotification] = useState(null)
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = { 
      name: newName,
      number: newNumber,
      id: String(persons.length+1),
    }

    if (persons.some(person => person.name === newObject.name)) {
      if (window.confirm(`${newObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldId = persons.filter(p => p.name === newObject.name)[0].id
        personsService
          .update(oldId, newObject)
          .then(response => {
            setPersons(persons.map(p => p.name === response.name ? response : p))
            setNewName('')
            setNewNumber('')
            setNoteType('note')
            setNotification(`Changed ${response.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          .catch(() => {
            setNoteType('error')
            setNotification(`Information of ${newObject.name} has already been removed from server`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
      }
      return
    }
    personsService.create(newObject).then((newPerson) => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setNoteType('note')
      setNotification(`Added ${newPerson.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    })
  }

  const deleteWithId = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => (person.id !== p.id)))
    })
  }

  const handleNewFilter = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={noteType}/>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />

      <h3>Add a new</h3>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <ShowPersons 
        persons={personsToShow} 
        deleteWithId={deleteWithId}
      />
    </div>
  )
}

export default App