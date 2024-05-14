import React, { useState } from 'react'
import './Holiday.css' // Import your CSS file for styling if needed

const Holiday = () => {
  const [isDeclaringHoliday, setDeclaringHoliday] = useState(false)

  const handleDeclareHoliday = async () => {
    try {
      const res = await fetch('/holiday') // Include the protocol (http/https)

      if (!res.ok) {
        throw new Error(`Failed to declare holiday. Status: ${res.status}`)
      }
      if (res.ok) {
        console.log('Holiday declared successfully')
        setDeclaringHoliday(!isDeclaringHoliday)
      }
    } catch (error) {
      console.error('Error declaring holiday:', error.message)
    }
  }

  return (
    <div className='holiday-container'>
      <div className='holiday-main'>
        <h1 className='holiday-heading'>
          Welcome to the Holiday Declaration Page
        </h1>
        <p className='caution'>
          Be careful; you cannot reverse it after declaring a holiday
        </p>
        <button
          className={`holiday-button ${isDeclaringHoliday ? 'active' : ''}`}
          onClick={handleDeclareHoliday}
        >
          {isDeclaringHoliday ? 'Holiday Declared Successfully' : 'Declare Holiday'}
        </button>
        <p className='holiday-description'>
          {isDeclaringHoliday
            ? 'Holiday has been declared for all teachers.'
            : 'No holiday has been declared yet.'}
        </p>
      </div>
    </div>
  )
}

export default Holiday
