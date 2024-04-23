import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userDetailAction } from "../../store/UserDetailSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Groups(props) {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const currentGroupId = useSelector((state) => state.userDetail.currentGroupId);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3001/groups/getGroups", {
          headers: { "access-token": token },
        });
        setGroups(res.data.groups);
        //  console.log(res.data.groups);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups();
  }, [token]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickUserOpen = () => {
    setUserOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUserOpen(false);
    setSearchUsers([]);
  };
  const groupHandler = (value) => {
    dispatch(userDetailAction.deleteCurrentGroupId());
    props.setSelectedGroup(true);
    dispatch(
      userDetailAction.enterCurrentGroupId({
        currentGroupId: value.id,
        currentGroupName: value.name,
      })
    );
  };
  const initialValues = {
    groupName: "",
  };

  const validationSchema = Yup.object().shape({
    groupName: Yup.string().required("Group name is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axios.post(
          "http://localhost:3001/groups/createGroup",
          values,
          { headers: { "access-token": token } }
        );
        console.log(res);
        formik.resetForm();
        // Close the dialog
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const initialValues2 = {
    userName: "",
    //email:"",
    //phoneNumber:"",
  };

  const validationSchema2 = Yup.object().shape({
    userName: Yup.string().required("Group name is required"),
  //  email:Yup.string().required("Email is required").email(),
  //  phoneNumber:Yup.number().required("Phone Number is required").min(10),
  });
  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: validationSchema2,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:3001/addAndSearch/searchUsers",
          values,
          { headers: { "access-token": token } }
        );
        setSearchUsers(res.data.users);
        console.log(res);
        formik2.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });


    const addUserHandler = async (values) => {
      try {
        const res = await axios.post(
          `http://localhost:3001/addAndSearch/addUsers/${currentGroupId}`,
          values,
          { headers: { "access-token": token } }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "65vh",
        display: "flex",
        bgcolor: "primary.light",
        flexDirection: "column",
        borderRadius: "1rem",
        padding: "1rem",
        marginTop: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid teal",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontVariant: "small-caps",
            fontWeight: "bold",
            color: "primary.contrastText",
          }}
        >
          Group Names
        </Typography>
        <IconButton
          onClick={handleClickOpen}
          sx={{ color: "primary.contrastText" }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box>
        {groups.map((value, key) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              marginY: "0.5rem",
              bgcolor: "primary.dark",
              borderRadius: "0.5rem",
              padding: "0.1rem",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="text"
              onClick={() => groupHandler(value)}
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "primary.light",
                marginX: "0.5rem",
              }}
            >
              {value.name}
            </Button>
            <IconButton
              onClick={handleClickUserOpen}
              sx={{ color: "primary.light" }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY: "0.2rem",
              marginX: "4rem",
            }}
          >
            Create Group
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="groupName"
              name="groupName"
              label="Group Name"
              variant="outlined"
              value={formik.values.groupName}
              onChange={formik.handleChange}
              error={
                formik.touched.groupName && Boolean(formik.errors.groupName)
              }
              helperText={formik.touched.groupName && formik.errors.groupName}
              sx={{ marginY: "1rem" }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={userOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY: "0.2rem",
            }}
          >
            <IconButton onClick={handleClose} sx={{ color: "primary.main" }}>
              <CloseIcon />
            </IconButton>
            Add User In Group
          </Box>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={formik2.handleSubmit}
            style={{ display: "flex", marginTop: "1rem", width: "28rem" }}
          >
            <TextField
              fullWidth
              id="userName"
              name="userName"
              label="User Name "
              variant="outlined"
              value={formik2.values.groupName }
              onChange={formik2.handleChange}
              error={
                formik2.touched.groupName && Boolean(formik2.errors.groupName)
              }
              helperText={formik2.touched.groupName && formik2.errors.groupName}
              // sx={{ marginY: "1rem" }}
            />
            <Button
              onClick={formik2.handleSubmit}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </form>
          <Box>
            {searchUsers.map((value, key) => (
              <Box key={key} sx={{ display: "flex", alignItems: "center" ,margin:"0.7rem",paddingX:"1.5rem",borderRadius:"0.5rem",justifyContent:"space-between",bgcolor:"primary.dark"}}>
                <FormControlLabel
                  control={<Typography variant="h6" sx={{ color: "primary.main" ,fontVariant: "small-caps"}}>{value.name}</Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik2.values.isAdmin}
                      onChange={formik2.handleChange}
                      name="isAdmin"
                      color="primary"
                    />
                  }
                  label="Admin"
                />
                <FormControlLabel
                  control={
                    <IconButton onClick={() => addUserHandler(value)}>
                      <AddIcon />
                    </IconButton>
                  }
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Groups;
