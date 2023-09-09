/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AirportSearch from "./AirportSearch";
import { DatePicker } from "../../Component/DatePicker";
import { CountPicker } from "../../Component/CountPicker";
import { FlightResults } from "./FlightResults";
// const {originCode, destinationCode, departDate, returnDate, adultCount, childCount} = req.body;

export default function FlightSearch() {

    const [query, setQuery] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getApiData = async () => {
            let url = `http://localhost:8080/flight?originCode=${query.originCode}&destinationCode=${query.destinationCode}&departDate=${query.departDate}&adultCount=${query.adultCount}&childCount=${query.childCount}&infantCount=${query.infantCount}`;

            if (query.returnDate !== "") {
                url = url + `&returnDate=${query.returnDate}`
            }
            // console.log(url);

            const response = await fetch(url);
            const apiData = await response.json();

            setSearchResult(apiData);
            setShow(true);
            console.log(apiData);
        }
        if (Object.keys(query).length >= 1) getApiData();

    }, [query])



    const handleFormSubmit = (eve) => {
        eve.preventDefault();
        setShow(false);
        setQuery({
            originCode: eve.target.originCode.value.toString().toUpperCase(),
            destinationCode: eve.target.destinationCode.value.toString().toUpperCase(),
            departDate: eve.target.departDate.value.toString(),
            returnDate: eve.target.returnDate.value.toString(),
            adultCount: eve.target.adultCount.value.toString(),
            childCount: eve.target.childCount.value.toString(),
            infantCount: eve.target.infantCount.value.toString(),
        })
    }

    return (
        <div>

            <form action="" onSubmit={handleFormSubmit}>

                <AirportSearch name="originCode" label="From" placeholder="Origin" />

                <AirportSearch name="destinationCode" label="To" placeholder="Destination" />

                <DatePicker name="departDate" label="Depart" placeholder="Departure Date" />

                <DatePicker name="returnDate" label="Return" placeholder="Arrival Date" />

                <CountPicker name="adultCount" label="Adults" placeholer="Enter Adult Count" />

                <CountPicker name="childCount" label="Children (2-12years)" placeholer="Enter Child Count" />

                <CountPicker name="infantCount" label="Infants (age < 2years)" placeholer="Enter Infant Count" />

                <button onClick={console.log("Clicked")} type="submit">Submit Here</button>
            </form>

            {
                show &&
                <div>
                    {searchResult.data.map(ele =>
                        <FlightResults
                            ele={ele}
                            dict={searchResult.dictionaries}
                            key={ele.id}
                        />
                    )}
                </div>}
        </div>
    );
}

