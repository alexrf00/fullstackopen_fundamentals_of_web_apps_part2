
const Number = ({ data, deleteHandler }) => {
  return (
    <ul style={{ paddingLeft: '0' }}>
      {data.map((value) => (
        <li key={value.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ margin: '0', marginRight: '10px' }}>{value.name} {value.number}</p>
          <button onClick={() => deleteHandler(value.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}

export default Number;
