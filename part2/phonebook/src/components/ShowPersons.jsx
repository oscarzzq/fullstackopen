const Name = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const ShowPersons = ({ persons }) => {
    return (
        <>
            {persons.map(person => <Name key={person.id} person={person} />)}
        </>
    )
}

export default ShowPersons