import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Groups from "./Groups";
import io from "socket.io-client";
import SendDocs from "./SendDocs";

function Homepage() {
  const [message, setMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const groupId = useSelector((state) => state.userDetail.currentGroupId);
  const groupName = useSelector((state) => state.userDetail.currentGroupName);
  const socket = io.connect("http://localhost:3001");

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
  
  useEffect(() => {
    const fetchMsg = async () => {
      socket.on("newMessage", (message) => {
        // Check if the message already exists in the message list
        const messageExists = messageList.some((msg) => msg.id === message.id);
  
        // If the message doesn't exist, add it to the message list
        if (!messageExists) {
          setMessageList((prevMessages) => [...prevMessages, message]);
          console.log(message);
        }
      });
    };
  
    fetchMsg();
  
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messageList]); // Re-run effect if socket or messageList change
  
  

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
        const res = await axios.post(
          `http://localhost:3001/messages/sendMessage/${groupId}`,
          values,
          { headers: { "access-token": token } }
        );
        formik.resetForm();
        // try {
        //   const res = await axios.get(
        //     `http://localhost:3001/messages/getMessages/${groupId}`,
        //     { headers: { "access-token": token } }
        //   );
        //   setMessage(res.data.messages);
        // } catch (error) {
        //   console.log(error);
        // }
      const newMessage = {
          message: res.data.message.message,
          senderName: res.data.message.senderName,
          groupId: res.data.message.GroupId,
        };
        setMessage((msgs) => [...msgs, newMessage]);
           socket.emit("message", newMessage);
         //  socket.emit('joinRoom', res.data.message.GroupId)
      } catch (error) {
        console.log(error);
      }
   
    },
  });
  const isUrl = (str) => {
    // Regular expression to match URL pattern
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return urlPattern.test(str);
  };
  const refreshHandler = async()=>{
    try {
      const res = await axios.get(
        `http://localhost:3001/messages/getMessages/${groupId}`,
        { headers: { "access-token": token } }
      );
      setMessage(res.data.messages);
    } catch (error) {
      console.log(error);
    }
  }
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
      <Grid container direction="row">
        <Grid item md={3.5}>
          <Groups setSelectedGroup={setSelectedGroup} socket={socket} />
        </Grid>
        <Grid
          item
          md={8}
          marginTop={"0.5rem"}
          marginLeft={"0.5rem"}
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "primary.light",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid teal",
              marginBottom: "0.3rem",
            }}
          >
            <Typography variant="h6" color={"primary.dark"}>
              Group Name :{" "}
            </Typography>
            <Typography
              variant="h5"
              color={"primary.main"}
              marginRight={"2rem"}
              fontWeight={"bold"}
              sx={{ fontVariant: "small-caps" }}
            >
              {groupName}
            </Typography>
            <IconButton onClick={() => refreshHandler()}><RefreshIcon color="primary" fontSize="large" /></IconButton>
          </Box>

          {selectedGroup && (
            <Box sx={{ flexGrow: 1, overflowY: "auto", height: "45vh" }}>
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
                    {isUrl(value.message) ? (
                      <img
                        src={value.message}
                        alt="Document"
                        style={{ maxWidth: "100px" }}
                      />
                    ) : ( value.message)}
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
          {selectedGroup && (
            <Box
              sx={{
                display: "flex",
                bgcolor: "primary.dark",
                textAlign: "center",
                justifyContent: "center",
                borderRadius: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <SendDocs setMessage={setMessage} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
