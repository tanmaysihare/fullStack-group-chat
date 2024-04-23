import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Groups from "./Groups";

function Homepage() {
  const [message, setMessage] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const groupId = useSelector((state) => state.userDetail.currentGroupId);
  const groupName = useSelector((state) => state.userDetail.currentGroupName);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/messages/getMessages/${groupId}`,
          { headers: { "access-token": token } }
        );
        setMessage(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [token, groupId]);

  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `http://localhost:3001/messages/sendMessage/${groupId}`,
          values,
          { headers: { "access-token": token } }
        );
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "85vh",
        display: "flex",
        bgcolor: "primary.main",
        flexDirection: "column",
        borderRadius: "1rem",
        padding: "1rem",
        marginTop: "1.5rem",
      }}
    >
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
      <Grid container  direction="row">

        <Grid item md={3.5} >
          <Groups setSelectedGroup={setSelectedGroup} />
        </Grid>
        <Grid
          item
          md={8}
          marginTop={"0.5rem"}
          marginLeft={"0.5rem"}
          sx={{ display: "flex", flexDirection: "column",bgcolor:"primary.light", borderRadius: "1rem", padding: "1rem",}}
        >
          <Box sx={{display:"flex", justifyContent:"space-between",borderBottom:"2px solid teal",marginBottom:"0.3rem"}}>
          <Typography variant="h6" color={"primary.dark"} >Group Name : </Typography>
            <Typography variant="h5" color={"primary.main"} marginRight={"2rem"} fontWeight={"bold"} sx={{fontVariant:"small-caps"}}>{groupName}</Typography>
          </Box>
          
          {selectedGroup && (
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {message.map((value, key) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.35rem",
                   // bgcolor: "primary.dark",
                    borderRadius: "0.5rem",
                    padding: "0.1rem",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontVariant: "small-caps",
                      color: "primary.main",
                      marginRight: "2rem",
                    }}
                  >
                    {value.senderName} :-
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "primary.contrastText",
                    }}
                  >
                    {value.message}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {selectedGroup && (
            <Box
              sx={{
                display: "flex",
                bgcolor: "primary.dark",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
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
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ fontWeight: "bold" }}
                type="submit"
                onClick={formik.handleSubmit}
              >
                SEND
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
