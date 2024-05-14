import React, { useState } from 'react'
import './index.css' // Import your CSS file for styling if needed

const HalfHoliday = () => {
  const [isDeclaringHoliday, setDeclaringHoliday] = useState(false)

  const handleDeclareHoliday = async () => {
    try {
      const res = await fetch('https://lms.fardindev.me/half-holiday') // Include the protocol (http/https)

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
          Welcome to the Half Holiday Declaration Page
        </h1>
        <p className='caution'>
          Be careful; you cannot reverse it after declaring a Half-holiday
        </p>
        <button
          className={`holiday-button ${isDeclaringHoliday ? 'active' : ''}`}
          onClick={handleDeclareHoliday}
        >
          {isDeclaringHoliday ? 'Holiday Declared Successfully' : 'Declare Half Holiday'}
        </button>
        <p className='holiday-description'>
          {isDeclaringHoliday
            ? 'Half-Holiday has been declared for all teachers.'
            : 'No Half-holiday has been declared yet.'}
        </p>
      </div>
    </div>
  )
}

export default HalfHoliday
