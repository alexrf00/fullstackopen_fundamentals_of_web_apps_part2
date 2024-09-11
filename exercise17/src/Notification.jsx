const Notification = ({ message }) => {
    if (message === null || message===undefined) {
      return null
    }

    const inlineStyle = {
        ...{color: message.success ? 'green': 'red'},
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
    }
  
    return (
      <div style={inlineStyle}>
        {message.message}
      </div>
    )
  }
  
  export default Notification
