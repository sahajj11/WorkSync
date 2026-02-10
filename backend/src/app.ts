import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db.ts';
import projectRoutes from "../src/routes/project.routes.ts"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/projects",projectRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});