/*
 *  A simple express JS server to test the card
 */

import express from "express";
import { card } from "./index.js";

const PORT = 9000;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req,res) => card(req,res));
app.listen(PORT, HOST, () => {
  console.log("Listening at ", PORT);
});
