/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */


import { useEffect, useState } from "react";
import './Stylesheet/airportSearch.css';
import {FaPlaneDeparture, FaPlaneArrival} from 'react-icons/fa';

export default function AirportSearch(props) {

    const [searchParam, setSearchParam] = useState(props.val || "");
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);
    const [listClick, setListClick] = useState(false);

    useEffect(() => { 
        const getApiData = setTimeout(async () => {
            if (!listClick && searchParam.length > 0 && searchParam.match(/^[A-Za-z]+$/)) {
                try{
                    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/airport-search/${searchParam}`,{
                        credentials:'include'
                    });
                    const apidata = await res.json();
                    setSearchResult(apidata.data);
                    setShow(true);
                }
                catch(err){
                    console.log(err);
                } 
            }
        }, 500)

        return () => { clearTimeout(getApiData); }
    }, [searchParam]);

    const handleInputChange = (e) => {
        setShow(false);
        setListClick(false);
        setSearchParam(e.target.value.toString().toUpperCase()); 
    }

    const handleListClick = (val) => {
        setSearchParam(val);
        setShow(false);
        setListClick(true);
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
                        searchResult?.map(ele =>
                            ((ele.name.startsWith(searchParam) || ele.iataCode.startsWith(searchParam) || ele.address.cityName.startsWith(searchParam))) &&
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
                                    <h6>{ele.address.cityName}</h6>
                                    <h6>{ele.address.countryName}</h6>
                                </div>
                            </div>
                        )
                    }

                </div>
            }
        </div>
    );
}