
import { useEffect, useState } from "react";
import AirportSearch from "./AirportSearch";
import { DatePicker } from "../../Component/DatePicker";
import { CountPicker } from "../../Component/CountPicker";
import { FlightResults } from "./FlightResults";
import { Link } from "react-router-dom";
import { FaSistrix } from 'react-icons/fa';
import { Loader } from "../../Component/Loader";

import './Stylesheet/flightSearch.css';
// const {originCode, destinationCode, departDate, returnDate, adultCount, childCount} = req.body;

export default function FlightSearch() {

    const [query, setQuery] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);
    const [showloader, setShowloader] = useState(false);
 
    const serializeQuery = (obj) => {
        let str = `?originCode=${obj.originCode}&destinationCode=${obj.destinationCode}&departDate=${obj.departDate}&adultCount=${obj.adultCount}&childCount=${obj.childCount}&infantCount=${obj.infantCount}`;
        if (obj.returnDate !== "") {
            str = str + (`&returnDate=${obj.returnDate}`);
        }
        return str;
    }
    if (Object.keys(query).length === 0) {
        setQuery({
            originCode: "",
            destinationCode: "",
            departDate: "",
            returnDate: "",
            adultCount: "",
            childCount: "",
            infantCount: "",
        })
    }
    useEffect(() => {

        const getApiData = async () => {
            setShowloader(true);
            try {
                const str = serializeQuery(query);
                let url = `http://localhost:8080/flight/flight-search${str}`;

                // console.log(url);

                const response = await fetch(url);
                const apiData = await response.json();

                setSearchResult(apiData);
                setShow(true);
                setShowloader(false);
                console.log(apiData);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (Object.keys(query).length >= 1 && query.destinationCode.length === 3 && query.departDate.length > 0) getApiData();

    }, [query])



    const handleFormSubmit = (eve) => {
        eve.preventDefault();
        setShow(false);
        console.log(eve.target);
        if (eve.target.childCount.value.toString() > 0 && eve.target.adultCount.value.toString() == 0) {
            alert("Children under 18 years of age cannot travel without Adult supervision")
        }
        else if (eve.target.adultCount.value.toString() < eve.target.infantCount.value.toString()) {
            alert("Number of Infant passengers cannot be less than less than Adults")
        }
        else {
            setQuery({
                originCode: eve.target.originCode.value.toString().toUpperCase(),
                destinationCode: eve.target.destinationCode.value.toString().toUpperCase(),
                departDate: eve.target.departDate.value.toString(),
                returnDate: eve.target.returnDate.value.toString(),
                adultCount: eve.target.adultCount.value.toString(),
                childCount: eve.target.childCount.value.toString(),
                infantCount: eve.target.infantCount.value.toString(),
            })
            console.log(query);
        }
    }
    return (
        <div>

            <form action="" onSubmit={handleFormSubmit} className="flight-search-form">

                <div className="airport-searchBar-container">
                    <AirportSearch name="originCode" val={query?.originCode} label="From" placeholder="Origin" req={true} />

                    <AirportSearch name="destinationCode" val={query?.destinationCode} label="To" placeholder="Destination" req={true} />
                </div>

                <div className="datepicker-input-container">
                    <DatePicker name="departDate" val={query?.departDate} label="Depart" placeholder="Departure Date" req={true} />

                    <DatePicker name="returnDate" val={query?.returnDate} label="Return" placeholder="Arrival Date" />

                    <div className="countpicker-input-container">

                        <CountPicker/>

                    </div>
                </div>

                <button className="flight-search-button" onClick={console.log("Clicked")} type="submit"> <FaSistrix /> <span>Search Flights</span></button>

            </form>

            {
                showloader && <Loader />
            }
            {

                show &&
                <div>
                    {
                        (searchResult.data.length === 0) ?
                            <div className="error-message">
                                <div>Error Logo</div>
                                <h1>Sorry !!!, No flights found for the chosen route</h1>
                            </div>
                            :
                            searchResult.data.map(ele =>
                                <Link
                                    to={{
                                        pathname: `/flight-booking/${ele.id}`,
                                        // query:{'obj':searchUrl},
                                        search: `${serializeQuery(query)}`
                                    }}
                                    search={`?`}
                                    key={ele.id}
                                    className="flight-search-link-tag"
                                >
                                    <FlightResults
                                        button={true}
                                        ele={ele}
                                        dict={searchResult.dictionaries}
                                    />
                                </Link>
                            )}
                </div>}
        </div>
    );
}

