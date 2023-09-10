
import { useEffect, useState } from "react";
import AirportSearch from "./AirportSearch";
import { DatePicker } from "../../Component/DatePicker";
import { CountPicker } from "../../Component/CountPicker";
import { FlightResults } from "./FlightResults";
import { Link } from "react-router-dom";
// const {originCode, destinationCode, departDate, returnDate, adultCount, childCount} = req.body;

export default function FlightSearch() {

    const [query, setQuery] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);

    const serializeQuery = (obj) => {
        let str = `?originCode=${obj.originCode}&destinationCode=${obj.destinationCode}&departDate=${obj.departDate}&adultCount=${obj.adultCount}&childCount=${obj.childCount}&infantCount=${obj.infantCount}`;
        console.log(str);
        if (obj.returnDate !== "" && typeof (str) === "string" && str.length > 0) {
            str.concat(`&returnDate=${obj.returnDate}`);
        }
        return str;
    }
    if (Object.keys(query).length === 0) {
        setQuery({
            originCode: sessionStorage?.getItem('originCode') || "",
            destinationCode: sessionStorage?.getItem('destinationCode') || "",
            departDate: sessionStorage?.getItem('departDate') || "",
            returnDate: sessionStorage?.getItem('returnDate') || "",
            adultCount: sessionStorage?.getItem('adultCount') || "",
            childCount: sessionStorage?.getItem('childCount') || "",
            infantCount: sessionStorage?.getItem('infantCount') || "",
        })
    }
    useEffect(() => {

        const getApiData = async () => {
            try {
                const str = serializeQuery(query);
                let url = `http://localhost:8080/flight${str}`;

                // console.log(url);

                const response = await fetch(url);
                const apiData = await response.json();

                setSearchResult(apiData);
                setShow(true);
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
        setQuery({
            originCode: eve.target.originCode.value.toString().toUpperCase(),
            destinationCode: eve.target.destinationCode.value.toString().toUpperCase(),
            departDate: eve.target.departDate.value.toString(),
            returnDate: eve.target.returnDate.value.toString(),
            adultCount: eve.target.adultCount.value.toString(),
            childCount: eve.target.childCount.value.toString(),
            infantCount: eve.target.infantCount.value.toString(),
        })

        sessionStorage.setItem('originCode', eve.target.originCode.value.toString().toUpperCase());
        sessionStorage.setItem('destinationCode', eve.target.destinationCode.value.toString().toUpperCase());
        sessionStorage.setItem('departDate', eve.target.departDate.value.toString());
        sessionStorage.setItem('returnDate', eve.target.returnDate.value.toString());
        sessionStorage.setItem('adultCount', eve.target.adultCount.value.toString());
        sessionStorage.setItem('childCount', eve.target.childCount.value.toString());
        sessionStorage.setItem('infantCount', eve.target.infantCount.value.toString());

    }

    return (
        <div>

            <form action="" onSubmit={handleFormSubmit}>

                <AirportSearch name="originCode" val={query?.originCode} label="From" placeholder="Origin" />

                <AirportSearch name="destinationCode" val={query?.destinationCode} label="To" placeholder="Destination" />

                <DatePicker name="departDate" val={query?.departDate} label="Depart" placeholder="Departure Date" />

                <DatePicker name="returnDate" val={query?.returnDate} label="Return" placeholder="Arrival Date" />

                <CountPicker name="adultCount" val={query?.adultCount} label="Adults" placeholer="Enter Adult Count" />

                <CountPicker name="childCount" val={query?.childCount} label="Children (2-12years)" placeholer="Enter Child Count" />

                <CountPicker name="infantCount" val={query?.infantCount} label="Infants (age < 2years)" placeholer="Enter Infant Count" />

                <button onClick={console.log("Clicked")} type="submit">Submit Here</button>
            </form>

            {
                show &&
                <div>
                    {searchResult.data.map(ele =>
                        <Link
                            to={{
                                pathname: `/flight-booking/${ele.id}`,
                                // query:{'obj':searchUrl},
                                search: `${serializeQuery(query)}`
                            }}
                            search={`?`}
                            key={ele.id}
                        >
                            <FlightResults
                                ele={ele}
                                dict={searchResult.dictionaries}
                            />
                        </Link>
                    )}
                </div>}
        </div>
    );
}

