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
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import { loginBackgroundImg } from "../../utils/constants";
import { AccountCircle } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";

const initialstate = {
  loginDetails: {
    email: "",
    password: "",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const [state, setState] = useState(initialstate);
  const {
    loginDetails: { email, password },
  } = state;
  const LoginDetails = (event) => {
    event.preventDefault();
    setState(initialstate);
    dispatch(authenticateUser(state.loginDetails));
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
      // maxWidth="xs"
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
          boxShadow: "0px 0px 25px black",
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
            size="small"
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="standard"
            placeholder="Email"
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
            size="small"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            id="password"
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
            size="small"
            sx={{ mt: 2, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
        <Divider sx={{ width: "100%" }}>OR</Divider>

        <Link to="/registration" >Don't have an account?</Link>
      </Card>
    </Box>
  );
};

export default Login;
