import { Home } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/page_not_found.svg";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      gap={3}
    >
      <img src={notFoundImg} alt="Not Found 404" width={"30%"} />
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate("/")}
      >
        Back To Home
      </Button>
    </Box>
  );
};

export default NotFound;
