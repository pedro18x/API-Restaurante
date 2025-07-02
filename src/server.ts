import express from "express";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/error-handler";

const PORT = 3333;
const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => {
    console.log(`Server is Running on port ${PORT}`);
});
