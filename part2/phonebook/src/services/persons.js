import axios from "axios";
const baseUrl = "https://phonebook-p9sb.onrender.com/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then((response) => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request.then(response => response.data)
}

const update = (oldId, newPerson) => {
    const request = axios.put(`${baseUrl}/${oldId}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }