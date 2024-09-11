const Countries = ({ items }) => {
    console.log("items", items);
    const countryTreeElement = items.map((element, index) => (
        <li key={index}>
            Country: {element.countryName}, Capital: {element.countryCapital}, Language: {element.countryLanguage}
        </li>
    ));

    return (
        <ul>{countryTreeElement}</ul>
    );
}

export default Countries;