// lib/mongoose.js
import { Console } from 'console';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Connection function
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        // Already connected
        return mongoose.connection.asPromise();
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected:', conn.connection.host);
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw new Error('Database connection failed');
    }
};

export default connectDB;
