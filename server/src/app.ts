import express from 'express';
import { authenticateJWT } from './middlewares/authMiddlewares/authmiddleware';
import authRoutes from './routes/authRoute';
import commentRoutes from './routes/commentRoutes';
import projectRoutes from './routes/projectRoute';
import taskRoutes from './routes/taskRoutes';
import teamRoutes from './routes/teamRoutes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/teams', authenticateJWT, teamRoutes);
app.use('/projects', authenticateJWT, projectRoutes);
app.use('/tasks', authenticateJWT, taskRoutes);
app.use('/comments', authenticateJWT, commentRoutes);

export default app;
