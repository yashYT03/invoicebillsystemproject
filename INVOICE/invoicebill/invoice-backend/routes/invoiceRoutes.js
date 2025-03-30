import express from "express";
import { addInvoice, getInvoices } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/add-invoice", addInvoice);
router.get("/invoices", getInvoices);

export default router;
