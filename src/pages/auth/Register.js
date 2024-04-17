import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";

function Register() {
  const inisialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email(),
    phoneNumber: Yup.number().required("Phone Number is required").min(10),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: inisialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try{
        const res = await axios.post("http://localhost:3001/users/register",values);
        <Alert variant="filled" severity="success">
          {res.data.message}
        </Alert>
      }catch(err){
        console.log(err);
        <Alert variant="filled" severity="error">
          {err.message}
        </Alert>
      }
    },
  });
  return (
    <Container maxWidth="sm">
      <Box
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", marginTop: "4rem" }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h3" sx={{ textAlign: "center" , marginBottom: "1.5rem", fontVariant: "small-caps"}}>Register Form </Typography>
        <TextField
          fullWidth
          variant="outlined"
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onBlur={formik.handleBlur}
          sx={{}}
        />
        <TextField
          fullWidth
          variant="outlined"
          sx={{ marginTop: "1.5rem" }}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
          type="email"
        />
        <TextField
          sx={{ marginTop: "1.5rem" }}
          fullWidth
          variant="outlined"
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          onBlur={formik.handleBlur}
         
        />
        <TextField
          sx={{ marginTop: "1.5rem" }}
          fullWidth
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          type="password"
        />
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column",justifyContent:"space-between" }}>
        <Button sx={{ marginTop: "1.5rem" }} variant="contained" type="submit">
          Register
        </Button>
        <Link to="/login"><Button sx={{ marginTop: "1.5rem",color:"primary.light" }} variant="text">Existing User | Login Hare</Button></Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
