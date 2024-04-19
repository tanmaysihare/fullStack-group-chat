import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Container, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Homepage() {
  const [message, setMessage] = useState([]);
  
  const token =
  useSelector((state) => state.auth.token) || localStorage.getItem("token") ;
  useEffect(() => {
    const messages = async () => {
      try {
        const res = await axios.get("http://localhost:3001/messages/getMessages", {
          headers: { "access-token": token },
        });
        setMessage(await res.data.messages);
        console.log("set Message",res.data);
      } catch (error) {
        console.log(error);
      }
    };
    messages();
  }, [token]);

 
  const initialValues={
    message:""
  };
  const validationSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });
const formik = useFormik({
  initialValues: initialValues,
  validationSchema: validationSchema,
  onSubmit: async (values) => {
    console.log(values);
    try {
       await axios.post(
        "http://localhost:3001/messages/sendMessage",values ,
        {
          headers: { "access-token": token },
        }
      );
      try {
        const res = await axios.get("http://localhost:3001/messages/getMessages", {
          headers: { "access-token": token },
        });
        setMessage(await res.data.messages);
        console.log("set Message",res.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  },
})
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "75vh",
        display: "flex",
        bgcolor: "primary.main",
        flexDirection: "column",
        borderRadius: "1rem",
        padding: "1rem",
        marginTop: "2.5rem",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontVariant: "small-caps",
            fontWeight: "bold",
            color: "primary.contrastText",
          }}
        >
          Group Chat App
        </Typography>

        {message.map((value,key)=>{
          return(
            <Box
            key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                bgcolor: "primary.dark",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "primary.main",
                  marginRight: "1rem",
                }}
              >
                {value.UserId}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "primary.light",
                }}
              >
                {value.message}
              </Typography>
            </Box>
          )
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          bgcolor: "primary.dark",
          borderRadius: "0.5rem",
          padding: "0.5rem",
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          color="primary"
          size="small"
          sx={{ marginRight: "0.5rem" }}
          id="message"
          name="message"
          label="Message"
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          placeholder="Enter your message"
          multiline
          onBlur={formik.handleBlur}
          onFocus={formik.handleFocus}
          autoComplete="off"
          onReset={formik.handleReset}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          sx={{ fontWeight: "bold" }}
          type="submit"
        >
          SEND
        </Button>
      </Box>
    </Container>
  );
}

export default Homepage;
