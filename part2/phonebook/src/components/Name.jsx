const Name = ({ person, deletion }) => {
  return (
    <>
      <p>
        {person.name} {person.number} <button onClick={deletion}>delete</button>
      </p>
    </>
  )
}

export default Name