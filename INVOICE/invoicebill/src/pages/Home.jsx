import React from "react";
import Header from "./components/Header";
import AddInvoice from "./components/AddInvoice";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: 30 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Pending Invoices
        </Typography>
        <Box display="flex" justifyContent="center" marginTop={3}>
          <Button variant="contained" color="secondary">
            Add Invoice
          </Button>
        </Box>
      </Container>
      <AddInvoice />
    </>
  );
};

export default Home;

