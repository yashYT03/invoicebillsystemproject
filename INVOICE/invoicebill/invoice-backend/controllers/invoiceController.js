import db from "../db.js";

// Function to add an invoice with new fields
export const addInvoice = async (req, res) => {
  const {
    companyName,
    companySlogan,
    address,
    vendor,
    product,
    amount,
    tax,
    total,
    amountInWords,
    date,
    signature,
  } = req.body;

  const companyLogo = req.file ? req.file.buffer : null; // Handle uploaded logo as a binary object

  try {
    const [result] = await db.query(
      `INSERT INTO invoices 
      (companyName, companySlogan, address, vendor, product, amount, tax, total, amountInWords, date, signature, companyLogo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [companyName, companySlogan, address, vendor, product, amount, tax, total, amountInWords, date, signature, companyLogo]
    );

    res.status(201).json({ message: "Invoice added successfully", invoiceId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve all invoices
export const getInvoices = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, companyName, companySlogan, address, vendor, product, amount, tax, total, amountInWords, date, signature FROM invoices");
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
