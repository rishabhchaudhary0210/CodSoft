/* eslint-disable react/prop-types */
import { obj3 } from "./Data/UniContent"
import './Stylesheet/HotelDisplay.css';
import './Stylesheet/DisplayComponents.css';
const hotelImageUrl = import.meta.env.VITE_HOTEL_IMAGE;
const obj1 = obj3;
const HotelDisplay = () => {
    const rating = Number(obj1?.hotel?.categoryGroup?.code?.at(-1));

    return (
        <div className="hotel-display-container">
            <div className="hotel-display-subcont">
                <ImageHolder images={obj1?.hotel?.images} />
                <div className="box">

                    <h1>{obj1?.hotel?.name?.content}</h1>
                    <div className="star-container">
                        {
                            rating && rating <= 5 &&
                            Array(rating)?.map((m, i) =>
                                "hello  "
                            )
                            +
                            Array(5 - rating)?.map((m, i) =>
                                <IconStar key={i * 10} />
                            )
                        }
                    </div>
                    <div className="address">
                        <p>
                            {obj1?.hotel?.address?.number + ', ' + obj1?.hotel?.address?.street}
                        </p>
                        <p>
                            {obj1?.hotel?.city?.content + ', ' + obj1?.hotel?.state?.name}
                        </p>
                    </div>
                    {/* Add Link to booking */}
                    <a href="#">Book Hotel</a>
                    <p className="description">
                        {obj1?.hotel?.description?.content}
                    </p>
                </div>
            </div>
            <div className="input-holder">
                <h2>Enter dates to check room availability</h2>
                <div className="input-container">
                    <div>
                        <label htmlFor="check-in">Check-In</label>
                        <input type="date" name="check-in" id="check-in" />
                    </div>
                    <div>
                        <label htmlFor="check-out">Check-Out</label>
                        <input type="date" name="check-out" id="check-out" />
                    </div>
                </div>
                <h2>Enter Occupants</h2>
                <div className="input-container">
                    <div>
                        <label htmlFor="adult">Adults</label>
                        <input type="text" id="adult" />
                    </div>
                    <div>
                        <label htmlFor="child">Children</label>
                        <input type="text" id="child" />
                    </div>
                </div>
            </div>
            <div className="rooms-container">
                <h2>Rooms</h2>
                <div>
                    {
                        obj1?.hotel?.rooms?.map((room, index) =>
                            <RoomContainer room={room} obj1={obj1?.hotel} key={index + 'r'} />
                        )
                    }
                </div>
            </div>
            <div className="location-wrapper">
                <div className="location-container">
                    <h2>Nearby Locations</h2>
                    <LocationHolder locations={obj1?.hotel?.interestPoints} />
                </div>
                <div className="contact-container">
                    <h2>Hotel Contact</h2>
                    <ContactHolder email={obj1?.hotel?.email} phones={obj1?.hotel?.phones} />
                </div>
            </div>
        </div>
    )
}

const ImageHolder = (props) => {
    const images = props?.images?.slice()?.sort((a, b) => {
        if (a?.type?.code === b?.type?.code) {
            return b?.visualOrder - a?.visualOrder;
        }
        return a?.type?.code.localeCompare(b?.type?.code);
    })

    return (
        <div className="image-holder">
            {
                images?.map((image, index) =>
                    <div key={index + 'i'}>
                        {/* {console.log("obj ==" , image, hotelImageUrl)} */}
                        <h3>{image?.type?.description?.content}</h3>
                        <img src={hotelImageUrl + 'bigger/' + image?.path} alt="imgs" />
                    </div>

                )
            }
        </div>
    )
}

const RoomContainer = (props) => {

    const getRoomPathName = (roomCode) => {
        //getting specific image of room
        let foundObj = props?.obj1?.images?.find(item => item?.roomCode === roomCode);
        if (foundObj) return hotelImageUrl + foundObj.path;
        //if image not found so get random room image
        foundObj = props?.obj1?.images?.filter(item => item?.type?.code === "HAB")
        console.log(foundObj)
        let rand = Math.floor(Math.random() * foundObj?.length)
        if (foundObj) return hotelImageUrl + foundObj[rand].path
    }
    return (
        <div className="room-box">
            <div className="img-container">
                <img src={getRoomPathName(props?.room?.roomCode)} alt="room-img" />
            </div>
            <div className="info">
                <h4>{props?.room?.description}</h4>
                <div className="pax">
                    <p>
                        <span>
                            Max Occupancy
                        </span>
                        <span>
                            {props?.room?.maxPax}
                        </span>
                    </p>
                    <p>
                        <span>
                            Max-Adults
                        </span>
                        <span>
                            {props?.room?.maxAdults}
                        </span>
                    </p>
                    <p>
                        <span>
                            Max-Children
                        </span>
                        <span>
                            {props?.room?.maxChildren}
                        </span>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default HotelDisplay

const LocationHolder = (props) => {
    return (
        <div className="location-holder">

            <div className="point-container">
                {props?.locations?.map((loc, index) =>
                    <div key={index * 2} className="points">
                        <h3>{loc?.poiName}</h3>
                        <h5>{Number(loc?.distance) / 1000 + " km"}</h5>
                    </div>
                )}
            </div>
        </div>
    )
}


const ContactHolder = (props) => {
    return (
        <div className="contact-holder">
            <div className="email">
                <h4>Email</h4>
                <h5>{props?.email}</h5>
            </div>
            <div className="phone">
                <h4>Phones</h4>
                <div className="phone-cont">
                    {
                        props?.phones?.map((phone, index) =>
                            <div key={index * 10}>
                                <h5>{phone.phoneType}</h5>
                                <h5>{phone.phoneNumber}</h5>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


function IconStarFill(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
        </svg>
    );
}
function IconStar(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
        </svg>
    );
}
