import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { BookingDisplay } from "./BookingDone";
import { Loader } from "../../Component/Loader";

import './Stylesheet/manageBooking.css';

export const ManageBooking = () => {

    const [searchParam, setSearchParam] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [confirmationObj, setConfirmationObj] = useState({});
    const { id } = useParams();
    
    useEffect(()=>{
        const getApiData = async ()=>{
            try{
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/flight/manage-booking/${id}`, {
                    credentials:'include'
                })
                const apiData = await response.json();
                if(response.ok){
                    setShowLoader(false);
                    setConfirmationObj(JSON.parse(apiData));
                }
                console.log(JSON.parse(apiData));
            }
            catch(err){
                console.log(err);
            }
       }
        if(id === 'search'){
            setSearchParam('');
            setShowLoader(false);
            console.log("Search param search ");
        }
        else{
            getApiData();
            setShowLoader(true);
            // setSearchParam(id);
        }
    },[id])

    return (
        <div >
            <div className="search-booking-details">
                <input type="text" onChange={e=>setSearchParam(e.target.value)} placeholder="Enter Booking ID" value={searchParam}/>
                <Link to={`/manage-booking/${searchParam}`} className='link'> <FaSistrix />  Search Details</Link>
            </div>
            {showLoader && <Loader />}
            {Object.keys(confirmationObj).length > 0 && <BookingDisplay confirmationObj={confirmationObj} />}
        </div>


    )
}
