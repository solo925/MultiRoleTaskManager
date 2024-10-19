// app.ts
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mainRoute from './routes/mainRoute';

const app = express();
app.use(express.json());
dotenv.config();


// Use cookie-parser middleware and provide a secret
app.use(cookieParser(process.env.COOKIE_SECRET || 'your_secret_key_here'));
console.log(process.env.COOKIE_SECRET)

// Other middlewares like bodyParser, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRoute)

// app.use('/auth', authRoutes);
// app.use('/teams', authenticateJWT as RequestHandler, teamRoutes);
// app.use('/projects', authenticateJWT as RequestHandler, projectRoutes);
// app.use('/tasks', authenticateJWT as RequestHandler, taskRoutes);
// app.use('/comments', authenticateJWT as RequestHandler, commentRoutes);

export default app;
