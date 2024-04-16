import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import axios from "axios";
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required").min(6),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axios.post(
          "http://localhost:3001/users/login",
          values
        );
        <Alert variant="filled" severity="success">
          {res.data.message}
        </Alert>;
      } catch (err) {
        console.log(err);
        <Alert variant="filled" severity="error">
          {err.message}
        </Alert>;
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
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontVariant: "small-caps",
          }}
        >
          Login Form
        </Typography>
       
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
        <Button sx={{ marginTop: "1.5rem" }} variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
