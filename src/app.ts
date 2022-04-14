import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
