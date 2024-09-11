const PersonForm = ({form, nameInput:{newName:newName,handler:nameHandler}, numberInput:{newNumber:newNumber,handler:numberHandler}}) => {
    return(
      <form onSubmit={form}>
          <div>
            name: <input value={newName} onChange={nameHandler} />
          </div>
          <div>
            number: <input value={newNumber} onChange={numberHandler} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonForm