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
    const filteredPersons = persons.filter(v=>v.id!=id);
    const deleteRequest = personService.deletePerson(id);
    deleteRequest.then(response => {
      setPersons(filteredPersons)
    });
  }
  const addPerson = (event) =>{
    event.preventDefault();
    const value = {name:newName, number:newNumber, id: (persons.length+1).toString()};
    const personFound = persons.find((v)=>(v.name===value.name))
    if(personFound){
      const result = window.confirm(`${value.name} is already added to phonebook, replace the old number with a new one?`)
      if(result){
        console.log('object: ',personFound.id,{...value,id:personFound.id})
        const updatePersonNumberRequest = personService.updatePersonNumber(personFound.id,{...value,id:personFound.id});
        updatePersonNumberRequest.then(response => {
          console.log('response', response)
          const removedUpdatedPerson = persons.filter(v=>v.id!=personFound.id);
          setPersons(removedUpdatedPerson.concat(response))
        });
      }
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