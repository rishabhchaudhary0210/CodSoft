/* eslint-disable react/prop-types */
import { useState } from "react"
import './CountPicker.css';

export const CountPicker = (props) => {
  const [count, setCount] = useState(Number(props.val) || props.min);

  return (
    <div className="count-container">
      <label htmlFor={props.name}>{props.label} <div>{props.subTitle}</div> </label>
      
      <div>
        <input 
          type="button" 
          value="-" 
          onClick={() => {setCount(count - 1)}} 
          disabled={count == 0} 
        />
        
        <input 
          type="text" 
          min={props.min} 
          name={props.name} 
          id={props.name} 
          value={count} 
          required={props.req} 
          max={props.max}
        />
        
        <input 
          type="button" 
          value="+" 
          onClick={() => setCount(count + 1)} 
          disabled={count == 9} 
        />
      </div>
    </div>
  )
}
