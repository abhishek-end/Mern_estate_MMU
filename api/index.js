import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected To MongoDB!');
}).catch((e) => {
    console.log(e);
});

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req , res , next)=> {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
