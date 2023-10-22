import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation} from "react-router";
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { BookingDisplay } from "./BookingDone";
import { Loader } from "../../Component/Loader";
import { useAuthContext } from "../../Hooks/useAuthContext";

import './Stylesheet/manageBooking.css';

export const ManageBooking = () => {

    const [searchParam, setSearchParam] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [confirmationObj, setConfirmationObj] = useState({});
    let { id } = useParams();
    const navigate = useNavigate();

    const userId = new URLSearchParams(location.search)?.get('userId');
    const flightdbId = new URLSearchParams(location.search)?.get('flightdbId');
    
    useEffect(() => {
        const getApiData = async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_URL}/flight/manage-booking/${encodeURIComponent(id)}`;
                const response = await fetch(url, {
                    credentials: 'include'
                })
                const apiData = await response.json();
                setShowLoader(false);
                if (response.ok) {
                    setConfirmationObj(JSON.parse(apiData));
                    console.log(JSON.parse(apiData));
                } else {
                    setConfirmationObj({error:"OOPS! No data found. \n Recheck booking-id."});
                }
                // console.log(apiData)
            }
            catch (err) {
                console.log(err);
            }
        }
        if (id === 'search') {
            setSearchParam('');
            setShowLoader(false);
        }
        else {
            getApiData();
            setShowLoader(true);
            // setSearchParam(id);
        }
    }, [id])

    const HandleBookingDelete = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/delete-booking/${confirmationObj.data.id}?userID=${userId}&flightID=${flightdbId}`, {
            credentials: 'include'
        })
        if (response.ok) {
            navigate('/flights');
        }
        else {
            alert('Error cancelling flight. Please try again');
        }
    }

    return (
        <div className="manage-booking-container">
            <div className="search-booking-details">
                <input type="text" onChange={e =>setSearchParam(e.target.value)} placeholder="Enter Booking ID" value={searchParam} />
                <Link to={`/manage-booking/${searchParam}`} className='link'> <FaSistrix />  Search Details</Link>
            </div>
            {showLoader && <Loader />}
            {confirmationObj.error == null ?
                Object.keys(confirmationObj).length > 0 &&
                <div className="booking-details-container">
                    <BookingDisplay confirmationObj={confirmationObj} />
                    <div className="cancel-booking-container">
                        <button onClick={HandleBookingDelete} className="cancel-btn"> <FontAwesomeIcon icon={faTrash} /> Cancel Booking </button>
                        <Link to='/' className="link">
                            <button className="home-btn"> Home </button>
                        </Link>
                    </div>
                </div>
                :
                <div className="error-container">{confirmationObj.error}</div>
            }

        </div>


    )
}
