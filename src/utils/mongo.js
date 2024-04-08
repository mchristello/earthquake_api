import { connect, set } from 'mongoose';
import config from '../config/config.js';

export const connectMongo = async () => {
    try {
        set('strictQuery', false);
        await connect(config.MONGO_URI, { dbName: config.DB_NAME });

        console.log(`Connection to Mongo DB: OK.`);
    } catch (error) {
        if (error) {
            console.log(`Conection to MongoDB failed: ${error.message}`);
            process.exit();
        }
    }
}
