/* eslint-disable react/prop-types */

export const DatePicker = (props) => {
    var currDate = new Date().toISOString().split('T')[0];
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="date" name={props.name} min={currDate} id={props.name}/>
    </div>
  )
}
