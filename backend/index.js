import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'

const PORT = process.env.PORT;
const app = express();

// Middelwares

app.use(cors());
app.use(express.json())

// Middelware de consultas
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url} - ${new Date().toLocaleString()}`)
    next()
})

// Routes

app.use(userRoutes)
app.use(authRoutes)

// app.use();

app.listen(PORT, () =>{
    console.log(`🔥 Server running on http://localhost:${PORT}`);
})