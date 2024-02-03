/* eslint-disable react/prop-types */
import './Stylesheet/HotelResult.css';

const HotelResult = (props)=>{

  //getting general view img of hotel
    let ImageUrl = props?.hotel?.images?.filter(obj=>obj?.imageTypeCode === "GEN");
    ImageUrl = ImageUrl?.slice()?.sort((a,b)=>b?.order-a?.order)
  
    const rating = Number(props?.hotel?.categoryGroupCode.at(-1));
  
    return (
      <div className="hotel-result-container">
        <div className="img-container">
          <img src={import.meta.env.VITE_HOTEL_IMAGE+ImageUrl[0]?.path} alt="img" />
        </div>
        <div className="info-container">
          <h1>{props?.hotel?.name?.content}</h1>
          <div className="star-container">
            {
              rating && rating <=5 &&
              Array(rating).map((m,i)=>
                <IconStarFill key={i}/>
              ) 
              +
              Array(5-rating).map((m,i)=>
                <IconStar key={i*10}/>
              )
            }
          </div>
          <p className="address">
            <span>
              {props?.hotel?.address?.number + ", " + props?.hotel?.address?.street}
            </span>
            <span>
              {props?.hotel?.city?.content}
            </span>
          </p>
          <p className="description">{props?.hotel?.description?.content.substring(0,80)}</p>
          <div className="link-container">
            <a href="">Book</a>
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

export default HotelResult