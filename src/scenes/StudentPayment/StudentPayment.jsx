import { Box, Button, TextField,Select,MenuItem } from '@mui/material'
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
    try {
      const body = JSON.stringify(values)
      const response = await fetch('https://lms.fardin.space/payment-update', {
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
                value={values.Class}
                name='Class'
                error={!!touched.Class && !!errors.Class}
                helperText={touched.Class && errors.Class}
                sx={{ gridColumn: 'span 2' }}
              />
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
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Roll Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rollNo} // Use values.rollno here
                name='rollNo' // Use "rollno" as the name
                error={!!touched.rollNo && !!errors.rollNo}
                helperText={touched.rollNo && errors.rollNo}
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
  Class: yup.number().required('Class is required'),
  section: yup.string().required('Section is required'),
  rollNo: yup.number().required('Roll No. is required')
})

const initialValues = {
  Class: '',
  section:'',
  rollNo: ''
}

export default Form
