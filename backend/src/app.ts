import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db.ts';
import projectRoutes from "../src/routes/project.routes.ts"
import tasksRoutes from "../src/routes/tasks.routes.ts"
import usersRoutes from "../src/routes/user.routes.ts"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/projects",projectRoutes)
app.use("/api/tasks",tasksRoutes)
app.use("/api/users",usersRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});