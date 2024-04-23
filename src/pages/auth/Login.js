import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SnackbarActions } from "../../store/SnackbarSlice";
import { AuthActions } from "../../store/AuthSlice";
import { userDetailAction } from "../../store/UserDetailSlice";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
       console.log("response after login",res);
       dispatch(SnackbarActions.openSnackbar({message:res.data.message,severity:"success"}));
       dispatch(AuthActions.login(res.data.accessToken));
       dispatch(userDetailAction.enterUserName({userName:res.data.user}));
       localStorage.setItem("token",res.data.accessToken);
       localStorage.setItem("isLoggedIn",res.data.success);
       localStorage.setItem("currentUserName",res.data.user);
      
       navigate("/home");
      } catch (err) {
        console.log("error",err);
        dispatch(SnackbarActions.openSnackbar({message:err.response.data.message,severity:"error"}));
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
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column",justifyContent:"space-between" }}>
        <Button sx={{ marginTop: "1.5rem" }} variant="contained" type="submit">
          Login
        </Button>
        <Link to="/register"><Button sx={{ marginTop: "1.5rem",color:"primary.light" }} variant="text">New User | Register Hare</Button></Link>
        </Box>

      </Box>
    </Container>
  );
}

export default Login;
