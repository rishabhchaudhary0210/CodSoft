/* eslint-disable react/prop-types */

import { useState } from "react";

export const DatePicker = (props) => {
    var currDate = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(props.val || "");
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="date" name={props.name} min={currDate} value={date} onChange={(e)=>setDate(e.target.value)} id={props.name}/>
    </div>
  )
}
