const Filter = ({label, items:{currentValue, handler}}) => {
    return (
        <>
            {label}<input value={currentValue} onChange={handler} />
        </>
    )
}

export default Filter
