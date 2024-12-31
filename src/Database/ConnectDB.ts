import mongoose, { Connection } from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

class DatabaseConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseConnectionError';
    }
}

const connectDB = async (): Promise<Connection> => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    try {
    
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected:', conn.connection.host);

        conn.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        conn.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        return conn.connection;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('MongoDB connection error:', errorMessage);
        throw new DatabaseConnectionError('Database connection failed: ' + errorMessage);
    }
};

export default connectDB;