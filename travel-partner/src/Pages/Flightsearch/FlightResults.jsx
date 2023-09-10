/* eslint-disable react/prop-types */

export const FlightResults = ({ ele, dict }) => {

    return (
        <div
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
                                dict?.carriers[m.segments[0].carrierCode]
                            }</h3>

                            <h5>{
                                'Duration : ' + m.segments[0].duration.substring(2)
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