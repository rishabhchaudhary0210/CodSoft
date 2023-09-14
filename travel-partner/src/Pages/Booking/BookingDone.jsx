/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FlightResults } from "../Flightsearch/FlightResults";
import './Stylesheet/bookingDone.css';
// import {IoCheckmarkDoneCircleOutline} from 'react-icons/io';
// import {FaPlaneCircleCheck} from 'react-icons/fa'
// import {FaRegCircleCheck} from 'react-icons/fa'
// import {FaPlane} from 'react-icons/fa'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneCircleCheck } from '@fortawesome/free-solid-svg-icons'


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
        (Object.keys(confirmationObj).length === 0) ? <h1>Loading</h1> :
            Object.keys(confirmationObj).length > 0 &&
            <div className="booking-done-container">
                <div className="booking-done-info">
                    <FontAwesomeIcon className="booking-done-logo" icon={faPlaneCircleCheck} />
                    <h3>
                        Booking Confirm
                    </h3>
                    <h4>
                        {'PNR : ' + confirmationObj.data.associatedRecords[0].reference}
                    </h4>
                    <h5>
                        {'Ticketing-ID : ' + confirmationObj.data.id}
                    </h5>
                </div>

                <div>
                    <h1>Booking Details</h1>
                    <FlightResults
                        ele={confirmationObj.data.flightOffers[0]}
                    />
                </div>

                <div className="booking-done-trav-container">
                    <h1>Passenger Details</h1>
                    {confirmationObj.data.travelers.map((m, index) => <UserDetail index={index} key={m.id} ele={m} obj={confirmationObj.data.flightOffers[0].travelerPricings} />)}
                </div>
            </div>

    )
}

export const UserDetail = ({ ele, index, obj }) => {
    console.log("ind = " + index);
    console.log(obj[index])
    return (
        <div className="user-detail">
            <div className="name">
                <div>
                    {(ele.gender === 'MALE') ? 'MR.' : 'MS.'}
                </div>
                <div>
                    {ele.name.firstName}
                </div>
                <div>
                    {ele.name.lastName}
                </div>
            </div>
            <div className="dob">
                {ele.dateOfBirth}
            </div>
            <div className="contact">{ele.contact.emailAddress}</div>
            <div className="contact">{'+' + ele.contact.phones[0].countryCallingCode + ' ' + ele.contact.phones[0].number}</div>
            <div className="fare">
                <div>{obj[index].travelerType}</div>
                <div>{obj[index].price.currency + ' ' + obj[index].price.total}</div>
                <div>{obj[index].fareDetailsBySegment[0].cabin}</div>
            </div>
        </div>
    )
}