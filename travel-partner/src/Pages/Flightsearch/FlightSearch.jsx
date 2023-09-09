
import { useEffect, useState } from "react";
import AirportSearch from "./AirportSearch";
import { DatePicker } from "../../Component/DatePicker";
import { CountPicker } from "../../Component/CountPicker";
import { FlightResults } from "./FlightResults";
import { Link, createSearchParams } from "react-router-dom";
// const {originCode, destinationCode, departDate, returnDate, adultCount, childCount} = req.body;

export default function FlightSearch() {

    const [query, setQuery] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [show, setShow] = useState(false);                    

    const serializeQuery = (obj)=>{
        let str =  `?originCode=${obj.originCode}&destinationCode=${obj.destinationCode}&departDate=${obj.departDate}&adultCount=${obj.adultCount}&childCount=${obj.childCount}&infantCount=${obj.infantCount}`;
        if (obj.returnDate !== "") {
            str.append(`&returnDate=${obj.returnDate}`);
        }
        return str;
    }

    useEffect(() => {
        const getApiData = async () => {
            const str = serializeQuery(query);
            let url = `http://localhost:8080/flight${str}`;

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
        console.log(createSearchParams(query));

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
                    <Link 
                        to={{
                            pathname:`/flight-booking/${ele.id}`, 
                            // query:{'obj':searchUrl},
                            search:`${serializeQuery(query)}`
                        }}
                        search={`?`}
                        onClick={()=>{console.log(searchUrl)}}
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

