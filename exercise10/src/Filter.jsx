  
  const Filter = ({filter:{filter,handler:filterHandler}}) => {
    return (
      <div>
      filter shown with<input value={filter} onChange={filterHandler} />
    </div>
    )
  }
  
  export default Filter
