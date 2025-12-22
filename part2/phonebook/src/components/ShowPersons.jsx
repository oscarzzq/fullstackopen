import Name from './Name'

const ShowPersons = ({ persons, deleteWithId }) => {
    return (
        <>
            {persons.map(person => <Name key={person.id} person={person} deletion={() => deleteWithId(person)}/>)}
        </>
    )
}

export default ShowPersons