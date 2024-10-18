// app.ts
import express from 'express';
import mainRoute from './routes/mainRoute';

const app = express();
app.use(express.json());

app.use("/api/v1", mainRoute)

// app.use('/auth', authRoutes);
// app.use('/teams', authenticateJWT as RequestHandler, teamRoutes);
// app.use('/projects', authenticateJWT as RequestHandler, projectRoutes);
// app.use('/tasks', authenticateJWT as RequestHandler, taskRoutes);
// app.use('/comments', authenticateJWT as RequestHandler, commentRoutes);

export default app;
