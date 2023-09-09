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

        return () => { clearTimeout(getApiData); }
    }, [searchParam]);

    const handleInputChange = (e) => {
        setShow(false);
        setSearchParam(e.target.value.toString().toUpperCase());
        // console.log(searchParam);
    }

    const handleListClick = (val) => {
        setSearchParam(val);
        setShow(false);
    }

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input 
                type="text" 
                value={searchParam} 
                onChange={handleInputChange} 
                name={props.name} 
                id={props.name}
                autoComplete="off"
                />

            {
                show &&
                <div>
                    <div>{searchParam}</div>
                        <div>
                            {
                                searchResult.map(ele =>
                                    (ele.name.startsWith(searchParam) || ele.iataCode.startsWith(searchParam)) && 
                                    <div onClick={() => handleListClick(ele.iataCode)}
                                        style={{
                                            display:'flex',
                                            gap:'10px'
                                    }}>
                                        <h4>Name = {ele.name} </h4>
                                        <h5>IataCode = {ele.iataCode}</h5>
                                        <div style={{display:'flex', gap:'5px'}}>
                                            <h4>{ele.address.cityName}</h4>
                                            <h5>{ele.address.countryName}</h5>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </div>
            }
        </div>
    );
}