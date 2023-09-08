/* eslint-disable react/prop-types */

export const DatePicker = (props) => {
    var currDate = new Date().toISOString().split('T')[0];
  return (
    <div>
        <input type="date" name={props.name} min={currDate}/>
    </div>
  )
}
