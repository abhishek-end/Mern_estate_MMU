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


// app.post("/signup", (req, res) => {
//     const { username, email, password } = req.body;
  
//     // Simple validation (you should add more validation and error handling)
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: "Please provide all required fields." });
//     }
  
//     // Check if the email is already registered
//     if (users.some(user => user.email === email)) {
//       return res.status(400).json({ error: "Email is already registered." });
//     }
// })  


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
