import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = event => {
    setSelectedDate(event.target.value)
  }

  return (
    <Box>
      <TextField
        fullWidth
        variant='filled'
        id='date'
        label='Select Date'
        type='date'
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    </Box>
  )
}

export default MyDatePicker
