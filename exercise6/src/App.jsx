import { useState } from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const onNewNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }
  const addPerson = (event) =>{
    event.preventDefault();
    setPersons(persons.concat({name:newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNewNameHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((value,index)=>
        <Person key={index} name={value.name}></Person>
        )}
      </ul>
    </div>
  )
}

export default App