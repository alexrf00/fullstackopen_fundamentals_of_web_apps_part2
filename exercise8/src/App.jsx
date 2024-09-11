import { useState } from 'react'
import Person from './Person'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '7183493489'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const onNewNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }
  const onNewNumberHandler = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }
  const addPerson = (event) =>{
    event.preventDefault();
    const value = {name:newName, number:newNumber};

    if(persons.find((v)=>(v.name===value.name && v.number===value.number))){
      window.alert(`${value.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(value))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
        {persons.map((value,index)=>
        <Person key={index} name={value.name} number={value.number}></Person>
        )}
      </ul>
    </div>
  )
}

export default App