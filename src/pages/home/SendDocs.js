import React from 'react'
// import { useFormik } from "formik";
// import * as Yup from "yup";
import {Box,Button,} from "@mui/material";
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { SnackbarActions } from "../../store/SnackbarSlice";
function SendDocs(props) {
    const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const groupId = useSelector((state) => state.userDetail.currentGroupId);
  const dispatch = useDispatch();
    const uploadFile = async() => {
        try{
            const formData = new FormData();
            const fileInput = document.querySelector('#fileInput');
            formData.append('file', fileInput.files[0]);
            const res = await axios.post(`http://localhost:3001/uploads/upload/${groupId}`, formData, {
                headers: {
                    "access-token": token,
                  'Content-Type': 'multipart/form-data'
                }
                });
            console.log(res.data.msg);
            props.setMessage(res.data);
           dispatch(SnackbarActions.openSnackbar({message: res.data.Message,severity:"success"}));
        }catch(error){
            console.log(error)
            dispatch(SnackbarActions.openSnackbar({message: error.response.data.message,severity:"error"}));
        }
    }
  return (
    <Box>
          <input id="fileInput" type="file" />
        <Button onClick={() => uploadFile()}>upload</Button>
    </Box>
  )
}

export default SendDocs;
