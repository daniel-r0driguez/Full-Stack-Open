import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

const Countries = ({countries, searchEntry}) => {
    const countriesToShow = countries.filter(country => country.name.common.search(new RegExp(searchEntry, "i")) !== -1);

    // No more than 10 countries can be displayed.
    if (countriesToShow.length > 10)
    {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        );
    }
    else if (countriesToShow.length === 1)
    {
        return (
            <div>
                <DetailedCountry country={countriesToShow[0]}/>
            </div>
        );
    }
    // No countries were found at all.
    else if (countriesToShow.length === 0)
    {
        return (
            <div>
                <p>No Results!</p>
            </div>
        );
    }


    // Default list of countries.
    return (
        <div>
            {countriesToShow.map(country => <Country key={country.name.common} countryName={country.name.common}/>)}
        </div>
    );
}

export default Countries;