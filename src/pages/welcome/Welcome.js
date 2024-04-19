import React from "react";
import { Box, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
function Welcome() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <QuestionAnswerIcon color="primary" sx={{ fontSize: "42rem",zIndex:"0" }} />
        <Typography
       
        variant="h2"
        sx={{ textAlign: "left", marginLeft: "5rem",marginTop:"0",zIndex:"1" }}
      >
        Welcome to Group Chat
      </Typography>
      
      </Box>

    </>
  );
}
 
export default Welcome;
