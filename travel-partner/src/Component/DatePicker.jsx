/* eslint-disable react/prop-types */

import { useState } from "react";
import './DatePicker.css';


export const DatePicker = (props) => {

  var currDate = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(props.val || "");

  return (

    <div className="date-container">

      <label htmlFor={props.name}> {props.label} </label>

      <input
        type="date"
        name={props.name}
        min={currDate}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        id={props.name}
        required={props.req}
      />
    </div>

  )
}
