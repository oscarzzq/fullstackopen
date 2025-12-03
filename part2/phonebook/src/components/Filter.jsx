const Filter = ({ filter, handleNewFilter }) => {
    return <p>filter shown with <input value={filter} onChange={handleNewFilter}/></p>
}

export default Filter