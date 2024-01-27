import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { FlightResults } from "../Flightsearch/FlightResults";
import { UserInfoForm } from "./UserInfoForm";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLoader } from "../User/SignUp";
import { Loader } from "../../Component/Loader";
import './Stylesheet/bookingDetails.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BookingDetails = () => {

    // const [searchParam] = useSearchParams();
    const { search } = useLocation();
    const { id } = useParams();
    const [flightObject, setFlightObject] = useState({});
    const [dictionary, setDictionary] = useState({});
    const [infoObject, setInfoObject] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFlightRoute = async (obj) => {

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/booking-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
            credentials: 'include'
        })
        const apiData = await response.json();
        setFlightObject(apiData);

        if (apiData.warnings && apiData.warnings[0].title === "PricingOrFareBasisDiscrepancyWarning") {
            toast.warn("Booking Price Changed ! Kindly Check Before Proceeding")
        }
        console.log(apiData);
    }

    useEffect(() => {

        const getApiData = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/flight-search${search}`, {
                credentials: 'include'
            });
            const apiData = await response.json();

            setDictionary(apiData.dictionaries);
            const obj = apiData.data.filter(ele => ele.id === id);
            if (Object.keys(obj).length > 0) handleFlightRoute(obj);
        }
        getApiData();
        window.scrollTo(0, 0);
        // console.log("token = ",localStorage.getItem('jwt'));

    }, []);


    const handleInfoSubmit = (e, travId) => {
        e.preventDefault();
        const obj = {
            id: travId,
            dateOfBirth: e.target.dateofBirth.value,
            gender: e.target.gender.value,
            contact: {
                emailAddress: e.target.emailid.value,
                phones: [
                    {
                        deviceType: "MOBILE",
                        countryCallingCode: e.target.phone.value.substring(1, 3),
                        number: e.target.phone.value.substring(4),
                    },
                ],
            },
            name: {
                firstName: e.target.firstName.value.toUpperCase(),
                lastName: e.target.lastName.value.toUpperCase(),
            },
        }
        // setInfoObject(infoObject.filter(a => a.id !== obj.id))
        const arr = infoObject.filter(a => a.id !== obj.id)
        setInfoObject([...arr, obj])
        console.log(infoObject)
    }


    const handleConfirmBooking = async () => {
        setLoading(true);
        console.log("Clicked")
        if (infoObject.length !== flightObject.data.flightOffers[0].travelerPricings.length) {
            toast.warn("Kindly Save User Details Again !!!");
        } else {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/booking-confirm`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ flightInfo: flightObject.data.flightOffers, travelerInfo: infoObject, restoken: localStorage.getItem('jwt') }),
                    credentials: 'include'
                })
                const apiData = await response.json();
                const redirectKey = (await apiData.key);
                console.log(redirectKey);
                console.log(apiData);
                if (response.ok) {
                    navigate(`/flight-confirm/${redirectKey}`);
                } else {
                    toast.warn('Error Booking Flight! Please try again');
                    navigate(-1);
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        setLoading(false);
    }

    return (
        (Object.keys(flightObject).length === 0) ? <Loader /> :
            Object.keys(flightObject).length > 0 &&
            <div className="booking-details-container">
                   <ToastContainer />
                <h1>Booking Details</h1>

                <FlightResults
                    ele={flightObject.data.flightOffers[0]}
                    dict={dictionary}
                />

                <div className="forms-container">
                    <div className="forms-container-heading">
                        <h1>Passenger Details</h1>
                        <h3>Kindly ensure all the details are correct filled and are as per Government issued IDs.</h3>
                    </div>
                    {flightObject.data.flightOffers[0].travelerPricings.map(ele =>
                        <form key={ele.travelerId} className='user-info-form' action="" onSubmit={(e) => handleInfoSubmit(e, ele.travelerId)} >
                            <h4>{ele.travelerId + '. ' + ele.travelerType}</h4>
                            <UserInfoForm passAgeGroup={ele.travelerType} />
                            <div className="form-buttons">
                                <button type="submit">Save</button>
                                <input type="reset" value="Reset" />
                            </div>
                        </form>
                    )}
                </div>

                <div className="flight-confirm-button">
                    {/* <Link to={'/flight-confirm'}> */}
                    <button className='confirm-button' onClick={handleConfirmBooking}>
                        {loading ? <ButtonLoader /> : "Confirm Booking"}
                    </button>
                    {/* </Link> */}
                    <Link to={'/'}>
                        <button className="cancel-button">Cancel</button>
                    </Link>
                </div>
            </div>
    )
}

