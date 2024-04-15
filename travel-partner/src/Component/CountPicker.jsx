/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import './CountPicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

export const CountPicker = () => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  //Logic to detect click outside dropdown in order to close it if users clicks outside
  const newRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e)=>{
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  return (
    <div className='counter-box' ref={newRef}>
      <div className="count-header" onClick={() => setShowDropdown(!showDropdown)}>
        <p>{`Adult : ${adultCount}, Children : ${childCount}, Infants : ${infantCount}`}</p> <span >{!showDropdown?<FontAwesomeIcon icon={faCaretDown}/>:<FontAwesomeIcon icon={faCaretUp}/>}</span>
      </div>
      {<div className={`count-dropdown ${showDropdown? 'active' : ''}`}>
        <div className="count-container">
          <label htmlFor={'adultCount'}>Adults<div>{'>12 years'}</div> </label>
          <div>
            <input
              type="button"
              value="-"
              onClick={() => { setAdultCount(adultCount - 1) }}
              disabled={adultCount === 1}
            />
            <input
              type="text"
              min={1}
              name={'adultCount'}
              id={'adultCount'}
              value={adultCount}
              required={true}
              max={9}
              onChange={(e) => { setAdultCount(e.target.value) }}
            />
            <input
              type="button"
              value="+"
              onClick={() => { setAdultCount(adultCount + 1) }}
              disabled={adultCount === 9}
            />
          </div>
        </div>
        <div className="count-container">
          <label htmlFor={'childCount'}>Children <div>{'2-12 years'}</div> </label>
          <div>
            <input
              type="button"
              value="-"
              onClick={() => { setChildCount(childCount - 1) }}
              disabled={childCount === 0}
            />
            <input
              type="text"
              min={0}
              name={'childCount'}
              id={'childCount'}
              value={childCount}
              max={9}
              onChange={(e) => { setChildCount(e.target.value) }}
            />
            <input
              type="button"
              value="+"
              onClick={() => { setChildCount(childCount + 1) }}
              disabled={childCount === 9}
            />
          </div>
        </div>
        <div className="count-container">
          <label htmlFor={'infantCount'}>{'Infants'} <div>{'<2 years'}</div> </label>
          <div>
            <input
              type="button"
              value="-"
              onClick={() => { setInfantCount(infantCount - 1) }}
              disabled={infantCount === 0}
            />
            <input
              type="text"
              min={0}
              name={'infantCount'}
              id={'infantCount'}
              value={infantCount}
              max={adultCount}
              onChange={(e) => { setInfantCount(e.target.value) }}
            />
            <input
              type="button"
              value="+"
              onClick={() => { setInfantCount(infantCount + 1) }}
              disabled={infantCount === adultCount}
            />
          </div>
        </div>
      </div>
      }    </div>
  )
}
