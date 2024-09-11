import React, { useState } from 'react';

import Country from './Country';

const Countries = ({ items }) => {
    const [countryToExpand, setCountryToExpand] = useState(null);

    const handleShowCountryClick = (country) => {
        setCountryToExpand(country);
    };


    return (
        <div>
            {countryToExpand ? (
                <Country item={countryToExpand} />
            ) : (
                <ul>
                    {items.map((element, index) => (
                        <li key={index} style={{ listStyleType: 'none', marginBottom: '8px' }}>
                            {element.countryName}{' '}
                            <button onClick={() => handleShowCountryClick(element)}>Show</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Countries;
