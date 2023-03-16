import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCalculatedPremium } from "../../store/premium-actions";
import { userData } from "../../utils/helper";

const columns = [
  {
    title: "Policy Year",
    fieldName: "policyYear",
  },
  {
    title: "Premium",
    fieldName: "premium",
  },
  {
    title: "Sum Assured",
    fieldName: "sumAssured",
  },
  {
    title: "Bonus Rate",
    fieldName: "bonusRate",
  },
  {
    title: "Bonus Amount",
    fieldName: "bonusAmount",
  },
  {
    title: "Total Benefit",
    fieldName: "totalBenefit",
  },
  {
    title: "Net Cashflows",
    fieldName: "netCashflows",
  },
];

export default function Illustration() {
  const dispatch = useDispatch();
  const { calculatedPremium } = useSelector((state) => state.premium);

  useEffect(() => {
    dispatch(getCalculatedPremium(userData?._id));
  }, [dispatch]);
  return (
    <Box p={4}>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h5">Premiums</Typography>
      </Paper>
      <TableContainer component={Paper} sx={{ mt: 2, maxHeight: "calc(100vh - 250px)" }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell key={item.fieldName}>{item?.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calculatedPremium &&
              calculatedPremium.length > 0 &&
              calculatedPremium.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((elem, i) => (
                    <TableCell key={`${index}-${i}`}>
                      {row[elem?.fieldName]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
