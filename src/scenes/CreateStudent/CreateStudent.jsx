import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { useState } from 'react'
import './index.css'

const CreateStudent = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [message, setMessage] = useState('')

  const handleFormSubmit = async values => {
    console.log(values)
    try {
      const body = JSON.stringify(values)

      const response = await fetch(
        'https://backend-teacher-production.up.railway.app/create-student',
        {
          method: 'POST',
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body: body,
          cache: 'default'
        }
      )
      if (response.ok) {
        const responseData = await response.json()
        setMessage(responseData)
        console.log('Response:', responseData.message)
      } else {
        console.log('Error:', response.status, response.statusText)
      }
    } catch (error) {}

  }

  return (
    <Box m='20px'>
      <Header title='CREATE NEW STUDENT' subtitle='Create a New User Profile' />

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
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Class'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.number}
                name='number'
                error={!!touched.number && !!errors.number}
                helperText={touched.number && errors.number}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Roll Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rollnumber}
                name='rollnumber'
                error={!!touched.number && !!errors.number}
                helperText={touched.number && errors.number}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                id='date'
                label='Select Date'
                type='date'
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name='phone'
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create New Student
              </Button>
            </Box>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'x-large',
                color: message.status === 200 ? '#40ed40' : '#c95757'
              }}
            >
              {' '}
              {message.message}
            </h2>
            <p
              style={{
                textAlign: 'center',
                fontSize: 'large',
                color: message.status === 200 ? '#4287f5' : '#c95757'
              }}
            >
              {message.message1}
            </p>
          </form>
        )}
      </Formik>
    </Box>
  )
}
const phoneRegExp = /^[6789]\d{9}$/

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  number: yup.number().required('Number is required'),
  rollnumber: yup.number().required('Roll Number is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  date: yup.date().required('Date is required')
})

const initialValues = {
  name: '',
  number: '',
  rollnumber: '',
  phone: '',
  date: ''
}

export default CreateStudent
