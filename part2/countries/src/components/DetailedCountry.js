const DetailedCountry = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map(value => <li>{value}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
    );
}

export default DetailedCountry;