import express from "express";

import { routes } from './routes';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
