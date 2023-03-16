import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import validateForm, { ROUTES } from "../../utils/constants";
import {
  updatePremiumById,
  getPremiumDetailsById,
} from "../../store/premium-actions";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../utils/helper";
import { useNavigate } from "react-router";
import { Calculate } from "@mui/icons-material";

import calculateImg from "../../assets/calculate.svg";

const Input = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { premiumData } = useSelector((state) => state.premium);
  const [state, setState] = useState(premiumData);
  const [errors, setErrors] = React.useState({});
  const { dob, gender, sumAssured, modalPremium, premiumFrequency, pt, ppt } =
    state;
  const handleOnChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value });
  };
  const handleSubmit = () => {
    const validateError = validateForm(state);
    const noErrors = Object.keys(validateError).length === 0;
    setErrors(validateError);
    if (noErrors) {
      dispatch(updatePremiumById(userData._id, state)).then((res) => {
        if (res) navigate("/" + ROUTES.ILLUSTRATION);
      });
    }
  };

  useEffect(() => {
    dispatch(getPremiumDetailsById(userData._id));
  }, [dispatch]);
  useEffect(() => {
    if (premiumData) setState(premiumData);
  }, [premiumData]);

  return (
    <Box display={"flex"}>
      <Box
        width={"70%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={calculateImg} alt="Calculate" width={"60%"} style={{marginTop:"40px"}}/>
        <Typography variant="h5" mt={2} fontWeight={"bolder"}>Calulate Your Premium</Typography>
        <Typography  fontWeight={"bold"}>Choose The Best Policy for You</Typography>
      </Box>
      <Card sx={{ width: "100%", maxWidth: "300px", mt: 5, height:"fit-content" }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}
        >
          <Typography variant="h6" textAlign={"center"}>
            Calculate Policies
          </Typography>
          <TextField
            label="DOB"
            size="small"
            type="date"
            name="dob"
            value={dob}
            onChange={(event) => handleOnChange(event)}
            InputLabelProps={{ shrink: true }}
            error={errors.dob ? true : false}
            helperText={errors.dob}
          />
          <TextField
            label="gender"
            size="small"
            select
            name="gender"
            value={gender}
            onChange={(event) => handleOnChange(event)}
            error={errors.gender ? true : false}
            helperText={errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Sum Assured"
            size="small"
            name="sumAssured"
            value={sumAssured}
            onChange={(event) => handleOnChange(event)}
            error={errors.sumAssured ? true : false}
            helperText={errors.sumAssured}
          />
          <TextField
            type="number"
            label="Modal Premium"
            size="small"
            name="modalPremium"
            value={modalPremium}
            onChange={(event) => handleOnChange(event)}
            error={errors.modalPremium ? true : false}
            helperText={errors.modalPremium}
          />
          <TextField
            type="number"
            label="Premium Frequency"
            size="small"
            name="premiumFrequency"
            value={premiumFrequency}
            onChange={(event) => handleOnChange(event)}
            error={errors.premiumFrequency ? true : false}
            InputProps={{ inputProps: { min: 10000, max: 50000 } }}
            helperText={errors.premiumFrequency}
            select
          >
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="PT"
            size="small"
            name="pt"
            value={pt}
            onChange={(event) => handleOnChange(event)}
            error={errors.pt ? true : false}
            InputProps={{ inputProps: { min: 10, max: 20 } }}
            helperText={errors.pt}
          />
          <TextField
            type="number"
            label="PPT"
            size="small"
            name="ppt"
            value={ppt}
            onChange={(event) => handleOnChange(event)}
            error={errors.ppt ? true : false}
            InputProps={{ inputProps: { min: 5, max: 10 } }}
            helperText={errors.ppt}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleSubmit} endIcon={<Calculate/>}>
              Calculate Premium
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Input;
