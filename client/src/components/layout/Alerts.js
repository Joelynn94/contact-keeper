import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

function Alerts() {
  const alertContext = useContext(AlertContext)

  return (
    // look in the AlertContext to see if there are any alerts in the state array 
    // then map through alert 
    // for each alert we will output a dynamic div with the specific alert  
      alertContext.alerts.length > 0 && 
      alertContext.alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" /> {alert.msg}
        </div>
      ))
  )
}

export default Alerts