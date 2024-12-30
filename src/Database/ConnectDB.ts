import { Console } from 'console';
import mongoose, { Connection, ConnectOptions } from 'mongoose';

// Environment variable type check
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Interface for MongoDB connection options
interface MongooseConnectOptions extends ConnectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
}

// Custom error class for database connection errors
class DatabaseConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseConnectionError';
    }
}

/**
 * Establishes a connection to MongoDB using mongoose
 * @returns Promise<Connection> A promise that resolves to the mongoose connection
 * @throws {DatabaseConnectionError} If the connection fails
 */
const connectDB = async (): Promise<Connection> => {
    // Check if already connected
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