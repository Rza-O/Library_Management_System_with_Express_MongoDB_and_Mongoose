import express, { Application, Request, Response } from "express";
import morgan from 'morgan'

const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.send("Hola! Welcome to our Library Management System!");
});

export default app;
