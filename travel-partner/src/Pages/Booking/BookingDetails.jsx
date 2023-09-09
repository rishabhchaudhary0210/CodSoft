import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom"


export const BookingDetails = () => {

    // const [searchParam] = useSearchParams();
    const {search} = useLocation();
    const {id} = useParams();
    const [flightObject, setFlightObject] = useState({});

    const handleFlightRoute = async (obj) => {

        const response = await fetch('http://localhost:8080/flight-booking', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        const apiData = await response.json();
        setFlightObject(apiData);
        // console.log(apiData);
    }

    useEffect(()=>{
        
        const getApiData = async ()=>{
            const response = await fetch(`http://localhost:8080/flight${search}`);
            const apiData = await response.json();

            const obj = apiData.data.filter(ele => ele.id === id);
            // console.log(obj);

            if(Object.keys(obj).length > 0) handleFlightRoute(obj);
        }
        getApiData();
        
    },[]);


  return (
    <div>
        Booking Details
        <button onClick={()=>console.log(flightObject)}>Print</button>
    </div>
  )
}
