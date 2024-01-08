import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[message,setMessage]=useState('')

  const handleFormSubmit = async (values) => {
    // console.log(values);
    try {
      const body = JSON.stringify(values);


      const response = await fetch('https://backend-teacher-production.up.railway.app/create-user', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: body,
        cache: 'default'
      });
      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData)
        console.log("Response:", responseData);
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {

    }


    console.log(values.password);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Base Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.baseSalary}
                name="baseSalary"
                error={!!touched.lastName && !!errors.baseSalary}
                helperText={touched.baseSalary && errors.baseSalary}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />

              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
            <h2 style={{ textAlign: "center",color:"#c95757" }}> {message.message}</h2>
            <p style={{ textAlign: "center",color:"yellow" }}>{message.message1}</p>

          </form>

        )}
      </Formik>
    </Box>
  );
};
const phoneRegExp = /^[6789]\d{9}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  baseSalary: yup.string().required("Set a base salary"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  // email: yup.string().email("Invalid email address").required("Email is required"),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),


});

const initialValues = {
  name: "",
  baseSalary: "",
  password: "",
  confirmPassword: "",
  // email:"",
  phone: ""
};



export default Form;
