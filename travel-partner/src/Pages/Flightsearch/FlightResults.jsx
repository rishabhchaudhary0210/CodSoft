/* eslint-disable react/prop-types */
import './Stylesheet/flightResults.css';
import { FaPlane } from 'react-icons/fa';

export const FlightResults = ({ ele, dict, button }) => {

    return (
        <div
            className='flight-results-container'
        >
            <div className='flight-results-single'>

            {
                
                ele.itineraries.map(m =>

                    <div key={m.id} className='flight-results-item'>

                        <AirlineDetails
                            val={m.segments[0].departure}
                        />

                        <div className='flight-results-middle-container'>
                            <h3>{
                                dict?.carriers[m.segments[0].carrierCode]
                            }</h3>

                            <div> <hr/><FaPlane /> </div>

                            <h5>{
                                m.segments[0].duration.substring(2)
                            }</h5>

                            {/* <h5>{
                                dict.aircraft[m.segments[0].aircraft.code]
                            }</h5> */}
                        </div>

                        <AirlineDetails
                            val={m.segments[0].arrival}
                            />


                    </div>
                )
            }

            </div>
            <div className={'flight-results-price'}>
                <hr />
                {ele.price.currency + ' ' + ele.price.total}
                {button === true && <button className='flight-results-btn'>Select</button>}
            </div>
        </div >

    )
}


const AirlineDetails = ({ val }) => {
    return (
        <div className='airline-details-container'>
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