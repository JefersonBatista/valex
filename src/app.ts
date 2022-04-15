import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routers/routes.js";
import errorHandling from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use(errorHandling);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
