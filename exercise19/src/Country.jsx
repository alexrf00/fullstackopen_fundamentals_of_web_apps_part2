const Country = ({ item }) => {
    const { countryName, countryCapital, countryArea, countryLanguage, countryFlag } = item;
    console.log("item", item)
    console.log("countryArea", countryArea)
    console.log("countryCapital", countryCapital)
    console.log("countryFlag", countryFlag)
    console.log("countryLanguage", countryLanguage)
    console.log("countryName", countryName)
    return (
        <>
            <h1>{countryName}</h1>
            <p>
                {countryCapital}
            </p>
            <p>
                {countryArea}
            </p>
            <b>languages:</b>{countryLanguage.map((element, i) => (<li key={i} style={{ paddingLeft: "20px" }}>{element}</li>))}
            <img src={countryFlag[0]} />
        </>
    )
}

export default Country