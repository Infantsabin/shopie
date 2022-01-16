import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("Shopie User");
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");
  const dateConvert = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/product`)
        .then((response) => {
          setCards(response.data.values);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/auth/user`, {
          params: { token: token },
        })
        .then((response) => {
          setName(response.data.values.name);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          navigate("/");
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar name={name} />
      <Container sx={{ py: 8 }} maxWidth="md" style={{ marginTop: "70px" }}>
        <Grid container spacing={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell align="right">Discount (%)</StyledTableCell>
                  <StyledTableCell align="right">Code</StyledTableCell>
                  <StyledTableCell align="right">Created At</StyledTableCell>
                  <StyledTableCell align="right">Updated At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.discount}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.code}</StyledTableCell>
                    <StyledTableCell align="right">
                      {dateConvert(row.created_at)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dateConvert(row.updated_at)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  );
}
