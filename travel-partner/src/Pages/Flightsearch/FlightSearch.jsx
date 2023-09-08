/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AirportSearch from "./AirportSearch";
import { DatePicker } from "../../Component/DatePicker";
import { CountPicker } from "../../Component/CountPicker";
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
        console.log("Form Submitted");
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
        console.log(query);

    }

    return (
        <div>

            <form action="" onSubmit={handleFormSubmit}>

                <AirportSearch name="originCode" placeholder="Origin" />

                <AirportSearch name="destinationCode" placeholder="Destination" />

                <DatePicker name="departDate" placeholder="Departure Date" />

                <DatePicker name="returnDate" placeholder="Arrival Date" />

                <CountPicker name="adultCount" placeholer="Enter Adult Count" />

                <CountPicker name="childCount" placeholer="Enter Child Count" />

                <CountPicker name="infantCount" placeholer="Enter Infant Count" />

                <button onClick={console.log("Clicked")} type="submit">Submit Here</button>
            </form>

            {
                show &&
                <div>
                    {
                        searchResult.data.map(ele =>
                            <div>
                                <hr />
                                {
                                    ele.itineraries.map(m =>
                                        <div>
                                            <div>
                                                <h3>{m.segments[0].arrival.iataCode}</h3>
                                                <h4>
                                                    <span>{m.segments[0].arrival.terminal}</span>

                                                    <span>
                                                        <div>
                                                            {m.segments[0].arrival.at.substring(0, 10)}
                                                        </div>
                                                        <div>
                                                            {m.segments[0].arrival.at.substring(11)}
                                                        </div>

                                                    </span>
                                                </h4>
                                            </div>

                                            <div>
                                                <h3>{searchResult.dictionaries.carriers[m.segments[0].carrierCode]}</h3>
                                                <h5>Duration : {m.duration.substring(2)}</h5>
                                                <h5>{searchResult.dictionaries.aircraft[m.segments[0].aircraft.code]}</h5>
                                            </div>

                                            <div>
                                                <h3>{m.segments[0].departure.iataCode}</h3>
                                                <h4>
                                                    <span>{m.segments[0].departure.terminal}</span>

                                                    <span>
                                                        <div>
                                                            {m.segments[0].departure.at.substring(0, 10)}
                                                        </div>
                                                        <div>
                                                            {m.segments[0].departure.at.substring(11)}
                                                        </div>

                                                    </span>
                                                </h4>
                                            </div>

                                            <div>
                                                {ele.price.currency + ' ' + ele.price.total}
                                            </div>
                                        </div>
                                    )
                                }
                            <hr />
                            </div>
                        )
                    }
                </div>}
        </div>
    );
}

