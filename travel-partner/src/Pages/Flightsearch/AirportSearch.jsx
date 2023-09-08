/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */






import { useEffect, useState } from "react";

export default function AirportSearch(props) {

    const [searchParam, setSearchParam] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // setShow(false);
        const getApiData = setTimeout(async () => {
            const res = await fetch(`http://localhost:8080/airport-search/${searchParam}`);
            const apidata = await res.json();
            setSearchResult(apidata.data);
            setShow(true);
            console.log(apidata.data);
        }, 500)

        return () => clearTimeout(getApiData);
    }, [searchParam]);

    const handleInputChange = (e) => {
        setShow(false);
        setSearchParam(e.target.value);
        // console.log(searchParam);
    }

    return (
        <>
            <input type="text" value={searchParam} onChange={handleInputChange} name={props.name}/>
            {!show && <h2>Loading</h2>}
            {
                show &&
                <div>
                    <div>{searchParam}</div>
                    <div>
                        {
                            searchResult.map(ele =>
                                <div>
                                    <h3>Name = {ele.name} </h3>
                                    <h3>IataCode = {ele.iataCode}</h3> 
                                    <div>
                                        Address =
                                        <h4>{ele.address.cityName + "   " + ele.address.cityCode}</h4>
                                        <h5>{ele.address.countryName + "   " + ele.address.countryCode}</h5>
                                    </div>
                                    <hr />
                                </div>
                                
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
}