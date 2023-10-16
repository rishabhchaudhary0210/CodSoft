/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FlightResults } from "../Flightsearch/FlightResults";
import './Stylesheet/bookingDone.css';
import { Loader } from "../../Component/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router";


export const BookingDone = () => {

    const {id} = useParams();
    const [confirmationObj, setConfirmationObj] = useState({});

    useEffect(() => {
        const getApiData = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/booking-display/`+id, {
                    credentials:'include'
                });
                const apiData = await response.json();
                if(apiData.obj !== null){
                    console.log("onj presen");
                    setConfirmationObj(JSON.parse(apiData.obj));
                }
                else{
                    console.log("obj no presen");
                    setConfirmationObj(apiData);
                }
                console.log(id);
                console.log(apiData);
            }
            catch(err){
                console.log(err);
            }
        }
        getApiData();
    }, [])

    return (
        (Object.keys(confirmationObj).length === 0) ? <Loader /> :
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
    
    return (
        <div className="user-detail">
            <div className="subdiv-1">

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
                <div className="fare">
                    <div>{obj[index].travelerType}</div>
                    <div>{obj[index].price.currency + ' ' + obj[index].price.total}</div>
                    <div>{obj[index].fareDetailsBySegment[0].cabin}</div>
                </div>
            </div>
            <div className="subdiv-2">

                <div className="dob">
                    <span className="label">
                        D.O.B. :
                    </span>
                    <span className="content">
                        {ele.dateOfBirth}
                    </span>
                </div>
                <div className="contact email">
                    <span className="label">Email :</span>
                    <span className="content">{ele.contact.emailAddress}</span></div>
                <div className="contact phone">
                    <span className="label">Phone :</span>
                    <span className="content">{'+' + ele.contact.phones[0].countryCallingCode + ' ' + ele.contact.phones[0].number}</span></div>
            </div>
        </div>
    )
}