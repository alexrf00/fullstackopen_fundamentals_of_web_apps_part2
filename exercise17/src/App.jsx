import { useEffect, useState } from 'react'
import Number from './Number'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'
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
  const [message, setMessage] = useState(null)
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
  const messageHandler = (messageObj) => {
    setMessage(messageObj);
    setTimeout(()=>{
      setMessage(null)
    },5000);
  }
  const onDeleteHandler = (id) => {
    const filteredPersons = persons.filter(v=>v.id!=id);
    const personToDelete = persons.find(v=>v.id===id);
    const deleteRequest = personService.deletePerson(id);
    deleteRequest.then(response => {
      setPersons(filteredPersons)
      messageHandler({
        success: true,
        action: 'delete',
        message:`Deleted ${personToDelete.name}.`
      })
    }).catch(error=>{
      messageHandler({
        success: false,
        action: 'delete',
        message:`Information of ${personToDelete.name} has already been removed from server.`
      })
    });
  }
  const addPerson = (event) =>{
    event.preventDefault();
    const value = {name:newName, number:newNumber};
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
        setPersons(persons.concat(response));
        messageHandler({
          success: true,
        action: 'add',
          message:`Added ${value.name}.`
        })
      }).catch(error=>{
        messageHandler({
          success: false,
          action: 'add',

          message:`Error while adding ${value.name}.`
        })
      });
    }
  }
  const filteredArray = persons.filter((person) => person && person.name && person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={{filter, handler: onFilterHandler}}></Filter>
      <h3>add a new</h3>
      <PersonForm form={addPerson} nameInput={{newName: newName,handler: onNewNameHandler}} numberInput={{newNumber: newNumber,handler: onNewNumberHandler}}  ></PersonForm>
      <h2>Numbers</h2>
      <Number data={filteredArray} deleteHandler={onDeleteHandler}></Number>
    </div>
  )
}

export default App