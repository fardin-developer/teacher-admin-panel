import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { useState } from 'react'

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [message, setMessage] = useState('')
  const [green, setGreen] = useState(false)
  const handleFormSubmit = async values => {
    alert('ukj')
    try {
      const body = JSON.stringify(values)
      const response = await fetch('https://backend-teacher-production.up.railway.app/payment-update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
        cache: 'default'
      })
      if (response) {
        const responseData = await response.json()
        setMessage(responseData)
        console.log('Response:', responseData)
        if (responseData.message === 'payment updated as paid') {
          setGreen(true)
        }
        // alert(responseData.message)
      } else {
        console.log('Error: new', response.status, response.statusText)
      }
    } catch (error) {}

  }

  return (
    <Box m='20px'>
      <Header title='Upgrade the Due of Student' subtitle='Student payment' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Class'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.class}
                name='class'
                error={!!touched.class && !!errors.class}
                helperText={touched.class && errors.class}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Roll Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rollno} // Use values.rollno here
                name='rollno' // Use "rollno" as the name
                error={!!touched.rollno && !!errors.rollno}
                helperText={touched.rollno && errors.rollno}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                All balance Paid
              </Button>
            </Box>
            <h2 style={{ textAlign: 'center', color: green ? 'green' : 'red' }}>
              {' '}
              {message.message}
            </h2>
            <p style={{ textAlign: 'center', color: 'yellow' }}>
              {message.message1}
            </p>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const checkoutSchema = yup.object().shape({
  class: yup.number().required('Class is required'),
  rollno: yup.number().required('Roll No. is required')
})

const initialValues = {
  class: '',
  rollno: ''
}

export default Form
