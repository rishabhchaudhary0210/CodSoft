/* eslint-disable react/prop-types */
import HotelResult from "./HotelResult";
import { content } from "./Data/Content";
import './Stylesheet/HotelSearch.css';

const HotelSearch = () => {
  return (
    <div className="hotel-search-container">
      <div className="input-container">
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country"/>
        </div>
        <div>
          <label htmlFor="destination">
            Destination
          </label>
          <input type="text" id="destination" />
        </div>
      </div>
      <div>
        {
          content?.hotels?.map((hotel,index) => 
            <HotelResult hotel={hotel} key={index}/>
            )
        }
      </div>
    </div>
  )
}



export default HotelSearch