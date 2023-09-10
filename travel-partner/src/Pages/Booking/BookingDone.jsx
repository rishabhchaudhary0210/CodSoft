/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FlightResults } from "../Flightsearch/FlightResults";

export const BookingDone = () => {

    const [confirmationObj, setConfirmationObj] = useState({});

    useEffect(() => {
        const getApiData = async () => {
            const response = await fetch("http://localhost:8080/flight-booking-done");
            const apiData = await response.json();

            setConfirmationObj(apiData);
            console.log(apiData);
        }
        getApiData();
    }, [])

    return (

        Object.keys(confirmationObj).length > 0 && 
        <div>
            <h1>Booking Done Logo</h1>

            <div>
                <h1>Booking Details</h1>
                <FlightResults
                    ele={confirmationObj.data.flightOffers[0]}
                />
            </div>
            <div>
                {'Ticketing ID = '+confirmationObj.data.id}

            </div>
            <div>
                {confirmationObj.data.travelers.map( m => <UserDetail key={m.id} ele={m}/>)}  
            </div>
        </div>

    )
}

export const UserDetail = ({ele})=>{
    return (
        <div>
            <div>
                {ele.name.lastName+' '+ele.name.firstName+' '}{(ele.gender === 'MALE')?'MR.':'MS.'}
            </div>
            <div>
                {'D.O.B. ' + ele.dateOfBirth}
            </div>
            <div>
                <div>{ele.contact.emailAddress}</div>
                <div>{ele.contact.phones[0].countryCallingCode + ' ' + ele.contact.phones[0].number}</div>
            </div>
        </div>
    )
}