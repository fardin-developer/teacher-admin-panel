import { Box, Button, TextField, Select, MenuItem } from '@mui/material'
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
    // console.log(values);
    try {
      const body = JSON.stringify(values)

      const response = await fetch('https://lms.fardin.space/create-student', {
        method: 'POST',
        headers: {
          Accept: 'application/json', // Corrected the typo here
          'Content-Type': 'application/json'
        },
        body: body,
        cache: 'default'
      })
      if (response.ok) {
        const responseData = await response.json()
        setMessage(responseData.message)
        // console.log('Response:', responseData.message);
        alert(responseData.message)
      } else {
        console.log('Error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
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
                value={values.Class} // Corrected the field name here
                name='Class'
                error={!!touched.Class && !!errors.Class} // Corrected the field name here
                helperText={touched.Class && errors.Class} // Corrected the field name here
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Roll Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rollNo}
                name='rollNo'
                error={!!touched.rollNo && !!errors.rollNo}
                helperText={touched.rollNo && errors.rollNo}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                id='date'
                label='Select Date'
                type='date'
                value={values.DOB}
                name='DOB'
                error={!!touched.DOB && !!errors.DOB}
                helperText={touched.DOB && errors.DOB}
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
                label='Parents Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.parentsPhone}
                name='parentsPhone'
                error={!!touched.parentsPhone && !!errors.parentsPhone}
                helperText={touched.parentsPhone && errors.parentsPhone}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* <TextField value={values.section} sx={{ gridColumn: 'span 2' }} /> */}
              <Select
                fullWidth
                variant='filled'
                type='section'
                label='Parents Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.section}
                name='section'
                error={!!touched.section && !!errors.section}
                helperText={touched.section && errors.section}
                sx={{ gridColumn: 'span 2' }}
              >
                <MenuItem value={"none"}>None</MenuItem>
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={'B'}>B</MenuItem>
                <MenuItem value={'C'}>C</MenuItem>
                <MenuItem value={'D'}>D</MenuItem>
                <MenuItem value={'E'}>E</MenuItem>
              </Select>
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create New Student
              </Button>
            </Box>
            {/* Corrected message object access */}
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'x-large',
                color: message === 'success' ? '#40ed40' : '#c95757'
              }}
            >
              {' '}
              {message}
            </h2>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const phoneRegExp = /^[6789]\d{9}$/

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  Class: yup.number().required('Class is required'),
  rollNo: yup.string().required('Roll Number is required'),
  section: yup.string().required('If no section select None'),
  parentsPhone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required("Parent's Phone Number is compulsory"), // Corrected the error message here
  DOB: yup.date().required('Date of Birth is required') // Corrected the error message here
})

const initialValues = {
  name: '',
  Class: '',
  rollNo: '',
  section: '',
  parentsPhone: '',
  DOB: ''
}

export default CreateStudent
