import { Send } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { homeBackgroundImg } from "../../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"calc(100vh - 100px)"}
      sx={{backgroundImage:`url(${homeBackgroundImg})`, 
      borderRadius:"0 0 50% 0"
    }}
    >
      <Typography variant="h3" color={"white"}>Welcome to this page</Typography>
      <Button variant="contained" endIcon={<Send />}  onClick={() => navigate("/input")}>
        Check your premium
      </Button>
    </Box>
  );
};

export default Home;
