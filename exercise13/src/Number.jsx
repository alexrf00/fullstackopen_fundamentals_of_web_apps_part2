const Number = ({data}) =>{
    return (
      <ul style={{ paddingLeft: '0' }}>
          {data.map((value)=>
          <p key={value.id}>{value.name} {value.number}</p>
          )}
        </ul>
    )
  }


  export default Number
