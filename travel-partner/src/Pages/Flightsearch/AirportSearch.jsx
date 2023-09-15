/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */


import { useEffect, useState } from "react";
import './Stylesheet/airportSearch.css';
import {FaPlaneDeparture, FaPlaneArrival} from 'react-icons/fa';

export default function AirportSearch(props) {

    const [searchParam, setSearchParam] = useState(props.val || "");
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // setShow(false);
        const getApiData = setTimeout(async () => {
            if (searchParam.length > 0 && searchParam.match(/^[A-Za-z]+$/)) {
                const res = await fetch(`http://localhost:8080/airport-search/${searchParam}`);
                const apidata = await res.json();
                setSearchResult(apidata.data);
                setShow(true);
                // console.log(apidata.data);
            }
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
    const option = (props.label === 'From')? <FaPlaneDeparture/>:<FaPlaneArrival/>
    return (
        <div className="airport-search-container">
            <label htmlFor={props.name}>{option}  {props.label}</label>
            <input
                type="text"
                value={searchParam}
                onChange={handleInputChange}
                name={props.name}
                id={props.name}
                autoComplete="off"
                required={props.req}
            />

            {
                show &&
                <div className="search-result-container">
                    {   searchResult !== null > 0 &&
                        searchResult.map(ele =>
                            ((ele.name.startsWith(searchParam) || ele.iataCode.startsWith(searchParam))) &&
                            <div
                                key={ele.iataCode} 
                                onClick={() => handleListClick(ele.iataCode)}
                                className="search-item"
                                >
                                <div>
                                    <h4>{ele.iataCode}</h4>
                                    <h5>{ele.name}</h5>
                                </div>
                                <div>
                                    <h7>{ele.address.cityName}</h7>
                                    <h7>{ele.address.countryName}</h7>
                                </div>
                            </div>
                        )
                    }

                </div>
            }
        </div>
    );
}