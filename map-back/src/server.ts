import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";

import handleErrors from "./Middlewares/errorHandler.js";
import router from "./Routers/routers.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router)
app.use(handleErrors);

const port = +process.env.PORT || 4000;
app.listen(port,() => {
    console.log(`server is listening on port ${port}`)
});