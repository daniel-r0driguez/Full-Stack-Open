import Button from './Button';

const Country = ({countryName, handleShowCountry}) => {
    return (
        <>
            {countryName}<Button text='show' onClickHandler={() => handleShowCountry(countryName)}/><br/>
        </>
    );
}

export default Country;