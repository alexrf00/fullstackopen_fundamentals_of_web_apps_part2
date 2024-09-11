import { useEffect, useState } from 'react'
import Number from './Number'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data) 
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const onNewNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }
  const onNewNumberHandler = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }
  const onFilterHandler = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }
  const onDeleteHandler = (id) => {
    const name = persons.find((v)=>(v.id===id))
    const result = window.confirm(`Delete ${name.name}`)
    if(result){
      const filteredPersons = persons.filter(v=>v.id!=id);
      const deleteRequest = personService.deletePerson(id);
      deleteRequest.then(response => {
        setPersons(filteredPersons)
      });
    }
  }
  const addPerson = (event) =>{
    event.preventDefault();
    const value = {name:newName, number:newNumber, id: (persons.length+1).toString()};

    if(persons.find((v)=>(v.name===value.name && v.number===value.number))){
      window.alert(`${value.name} is already added to phonebook`)
    } else {
      const request = personService.create(value);
      request.then(response => {
        setPersons(persons.concat(response))
      });
    }
  }
  const filteredArray = persons.filter((person) => person && person.name && person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={{filter, handler: onFilterHandler}}></Filter>
      <h3>add a new</h3>
      <PersonForm form={addPerson} nameInput={{newName: newName,handler: onNewNameHandler}} numberInput={{newNumber: newNumber,handler: onNewNumberHandler}}  ></PersonForm>
      <h2>Numbers</h2>
      <Number data={filteredArray} deleteHandler={onDeleteHandler}></Number>
    </div>
  )
}

export default App