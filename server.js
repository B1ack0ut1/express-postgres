import express from "express";
import "./env.js";
import studentRoutes from "./src/student/routes.js";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`App is listening on port ${port}`));
