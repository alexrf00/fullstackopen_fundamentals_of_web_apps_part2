import { useState } from 'react'
import Person from './Person'
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
        <div>
          filter shown with<input value={filter} onChange={onFilterHandler} />
        </div>
      <form onSubmit={addPerson}>
      <h2>add a new</h2>

        <div>
          name: <input value={newName} onChange={onNewNameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNewNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ paddingLeft: '0' }}>
        {filteredArray.map((value)=>
        <Person key={value.id} name={value.name} number={value.number}></Person>
        )}
      </ul>
    </div>
  )
}

export default App