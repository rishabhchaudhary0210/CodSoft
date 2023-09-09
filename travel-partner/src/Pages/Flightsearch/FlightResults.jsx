/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import { Link, createSearchParams } from "react-router-dom";


export const FlightResults = ({ ele, dict }) => {

    // const navigate = useNavigate();
    // const handleFlightRoute = () => {
    //     console.log("Router Clicked");
    //     console.log(ele);
    //     const searchQuery = createSearchParams(ele);
    //     navigate({
    //         pathName: '/flight-booking',
    //         search: `?${searchQuery}`,
    //         replace: true
    //     })
    // }

    const handleFlightRoute = async ()=>{

        const response = await fetch('http://localhost:8080/flight-booking',{
            method:'POST',
            headers: { "Content-Type" : "application/json"},
            body:JSON.stringify(ele)
        })
        const apiData = await response.json();
        console.log(apiData);
    }

    return (
        // <Link to={'/flight-booking'} search={`?${createSearchParams(ele)}`}>
        <div 
        onClick={handleFlightRoute}
        style={{
            margin: '10px', padding: '10px', border: '1px solid black', background: 'grey'            
        }}>
            {
                ele.itineraries.map(m =>

                    <div key={m.id}>

                        <AirlineDetails
                            val={m.segments[0].arrival}
                        />

                        <div>
                            <h3>{
                                dict.carriers[m.segments[0].carrierCode]
                            }</h3>

                            <h5>{
                                'Duration : ' + m.duration.substring(2)
                            }</h5>

                            {/* <h5>{
                                dict.aircraft[m.segments[0].aircraft.code]
                            }</h5> */}
                        </div>

                        <AirlineDetails
                            val={m.segments[0].departure}
                        />

                    </div>
                )
            }
            <div>
                {ele.price.currency + ' ' + ele.price.total}
            </div>
        </div >
        // </Link>
        
    )
}


const AirlineDetails = ({ val }) => {
    return (
        <div>
            <h3>{val.iataCode}</h3>
            <h4>
                <span>{'T' + val.terminal}</span>

                <span>
                    <div>
                        {val.at.substring(0, 10)}
                    </div>
                    <div>
                        {val.at.substring(11)}
                    </div>

                </span>
            </h4>
        </div>
    );
}