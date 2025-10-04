import express from 'express';
import dotenv from 'dotenv';
import authroutes from './routes/auth.js';
import userroutes from './routes/user.js';
import classroomroutes from './routes/classroom.js';
import cors from 'cors';
import authMiddleware from './middleware/middleware.auth.js';
import http from 'http'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3003',
            'http://192.168.1.50:3000',
            'http://192.168.1.50:3001',
            'http://local-app.com:3000',
            /https?:\/\/.*\.ngrok-free\.app/
        ];
        if (!origin || allowedOrigins.some(pattern => {
            if (typeof pattern === 'string') return pattern === origin;
            return pattern.test(origin);
        })) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mounting
app.use('/api/auth', authroutes);


//for test
app.get('/', (req, res) => {
  res.status(200).send('API is running securely via ngrok!');
});

app.use('/user', authMiddleware, userroutes);
app.use('/classmanagement', classroomroutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Create the HTTP server
const server = http.createServer(app);

// Listen on the specified port
app.listen(PORT, () => {
  // console.log(`Server running on http://stack.brstdev.com:${PORT}`);
  console.log(`Server running on  http://localhost:${PORT}`);
});
