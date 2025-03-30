import React, { useState } from "react";
import { Box, TextField, Typography, Button, styled } from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Component = styled(Box)(({ themeColor }) => ({
  marginTop: 30,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  background: themeColor || "#f5f5f5",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  width: "50%",
  margin: "30px auto",
}));

const StyledTextField = styled(TextField)({
  margin: "10px 0",
  width: "100%",
});

const AddInvoice = () => {
  const [invoice, setInvoice] = useState({
    companyName: "",
    companySlogan: "",
    address: "",
    vendor: "",
    product: "",
    amount: "",
    tax: "",
    total: "",
    amountInWords: "",
    date: "",
    signature: "",
  });

  const [logo, setLogo] = useState(null);
  const [themeColor, setThemeColor] = useState("#f5f5f5");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedInvoice = { ...invoice, [name]: value };
    
    if (name === "amount" || name === "tax") {
      const amount = parseFloat(updatedInvoice.amount) || 0;
      const tax = parseFloat(updatedInvoice.tax) || 0;
      updatedInvoice.total = (amount + (amount * tax / 100)).toFixed(2);
    }
    setInvoice(updatedInvoice);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    if (logo) {
      doc.addImage(logo, "PNG", 15, 10, 50, 20);
    }

    doc.text(invoice.companyName || "Company Name", 70, 20);
    doc.text(invoice.companySlogan || "Slogan", 70, 30);
    doc.text("Address: " + (invoice.address || "Company Address"), 20, 40);
    doc.text("Invoice Details", 20, 60);
    
    autoTable(doc, {
      startY: 70,
      head: [["Field", "Value"]],
      body: [
        ["Vendor", invoice.vendor],
        ["Product", invoice.product],
        ["Amount", `Rs. ${invoice.amount}`],
        ["Tax", `${invoice.tax}%`],
        ["Total Amount", `Rs. ${invoice.total}`],
        ["Amount in Words", invoice.amountInWords],
        ["Date", invoice.date],
        ["Signature", invoice.signature],
      ],
    });

    doc.save("invoice.pdf");
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/add-invoice", invoice);
      alert("Invoice added successfully!");
      generatePDF();
    } catch (error) {
      alert("Error adding invoice: " + error.message);
    }
  };

  return (
    <Component themeColor={themeColor}>
      <Typography variant="h5" fontWeight="bold" color="primary">
        Add Invoice
      </Typography>
      
      <input
        type="color"
        value={themeColor}
        onChange={(e) => setThemeColor(e.target.value)}
        style={{ marginBottom: 10, cursor: "pointer" }}
      />
      
      <Box style={{ width: "80%" }}>
        <StyledTextField variant="outlined" label="Company Name" name="companyName" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Company Slogan" name="companySlogan" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Address" name="address" onChange={handleChange} />
        
        <Typography variant="body1" style={{ marginTop: 10, color: "black" }}>Upload Company Logo:</Typography>
        <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ marginBottom: 10 }} />

        <StyledTextField variant="outlined" label="Vendor Name" name="vendor" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Product Name" name="product" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Amount (in Rs)" type="number" name="amount" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Tax (%)" type="number" name="tax" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Total Amount" type="number" name="total" value={invoice.total} disabled />
        <StyledTextField variant="outlined" label="Amount in Words" name="amountInWords" onChange={handleChange} />
        <StyledTextField variant="outlined" label="Date" type="date" name="date" onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <StyledTextField variant="outlined" label="Signature (Optional)" name="signature" onChange={handleChange} />
      </Box>

      <Button variant="contained" color="primary" style={{ marginTop: 20, backgroundColor: "#1976d2" }} onClick={handleSubmit}>
        Add Invoice
      </Button>
    </Component>
  );
};

export default AddInvoice;
