import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routers/routes.js";

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use((error, req, res, next) => {
  const { type, message } = error;
  if (type) {
    return res.status(500).send(message);
  } else console.error(error);

  res.sendStatus(500);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
