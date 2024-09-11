import { useEffect, useState } from 'react'
import Number from './Number'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled: ', response)
      })
  }, [])
  const [persons, setPersons] = useState([
    
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    
  ]) 
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
  const addPerson = (event) =>{
    event.preventDefault();
    const value = {name:newName, number:newNumber, id: persons[persons.length-1].id+1};

    if(persons.find((v)=>(v.name===value.name && v.number===value.number))){
      window.alert(`${value.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(value))
    }
  }
  const filteredArray = persons.filter((v)=>v.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={{filter, handler: onFilterHandler}}></Filter>
      <h3>add a new</h3>
      <PersonForm form={addPerson} nameInput={{newName: newName,handler: onNewNameHandler}} numberInput={{newNumber: newNumber,handler: onNewNumberHandler}}  ></PersonForm>
      <h2>Numbers</h2>
      <Number data={filteredArray}></Number>
    </div>
  )
}

export default App