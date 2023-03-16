import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Container,
  Box,
  TextField,
  Button,
  Card,
  Divider,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { authenticateUser } from "../../store/login-actions";
import { addUserDetails } from "../../store/user-actions";
import { Link, useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import AuthContext from "../../utils/AuthContext";
import { loginBackgroundImg } from "../../utils/constants";
import { AccountCircle } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";

const initialstate = {
  loginDetails: {
    email: "",
    password: "",
    name: "",
  },
};

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(initialstate);
  const { authenticated } = useContext(AuthContext);
  const {
    loginDetails: { email, password, name },
  } = state;
  const LoginDetails = (event) => {
    event.preventDefault();
    setState(initialstate);
    dispatch(addUserDetails(state.loginDetails)).then((res) => {
      if (res) {
        navigate("/login");
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: "Successfully Signup",
          })
        );
      }
    });
  };

  const handleDetails = ({ target }) => {
    setState({
      ...state,
      loginDetails: {
        ...state.loginDetails,
        [target.name]: target.value,
      },
    });
  };
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);
  return (
    <Box
      component="main"
      sx={{ backgroundImage: `url(${loginBackgroundImg})`, height: "100vh" }}
    >
      <Card
        sx={{
          maxWidth: "400px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          right: "5%",
          top: "30%",
          overflow: "inherit",
          borderRadius: "5%",
          backgroundImage: "linear-gradient(white, #d1e2ff)",
          boxShadow:"0px 0px 25px black"
        }}
      >
        <PersonIcon
          style={{
            backgroundColor: "#e8f0fe",
            borderRadius: "90%",
            padding: "10px",
            fontSize: "50px",
            boxShadow: "0px 0px 5px grey",
            position: "absolute",
            top: -35,
            zIndex: 99,
          }}
        />
        <Box component="form" onSubmit={LoginDetails} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            placeholder="Username"
            value={name}
            label="Name"
            variant="standard"
            onChange={handleDetails}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            placeholder="Email"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={handleDetails}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            label="Password"
            variant="standard"
            value={password}
            onChange={handleDetails}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Divider sx={{ width: "100%" }}>OR</Divider>
        Have an account?
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </Card>
    </Box>
  );
};

export default Registration;
