import React from 'react'
import { useSelector } from 'react-redux'

//import './Indicator.style.css'

const Indicator = (number) => {
  const { firstName, lastName } = useSelector((state) => state.athlete)

  const athleteName = firstName + ' ' + lastName

  return (
    <div className="card-header">
      <h5 className="card-header-title header">
        {athleteName +
          ` please choose the criteria that you would like to consider when making this decision.`}
        <br />
        {`Some example criteria are shown below. Hover over them to get more information.`}
        <br />
        {`You may add or remove criteria in the list below.`}
        <br />
        {/* {`Currently  
            ${number}  
            criteria are chosen.`} */}
      </h5>
    </div>
  )
}

export default Indicator
