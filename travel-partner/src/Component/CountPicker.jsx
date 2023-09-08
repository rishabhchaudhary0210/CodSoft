/* eslint-disable react/prop-types */
import { useState } from "react"


export const CountPicker = (props) => {
    const [count, setCount] = useState(0);
  return (
    <div>
        <input type="button" value="-" onClick={()=>setCount(count-1)} disabled={count == 0}/>
        <input type="text" name={props.name} value={count}/>
        <input type="button" value="+" onClick={()=>setCount(count+1)} disabled={count == 9}/>
    </div>
  )
}
