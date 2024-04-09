import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import config from './config/config.js';
import { connectMongo } from './utils/mongo.js';
import router from './routes/routes.js';
import { getAndPersistEarthquakeData } from './utils/utils.js';


const app = express();
const httpServer = app.listen(config.PORT || 3000, console.log(`Server up and running on port ${config.PORT}`));



app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

connectMongo();

getAndPersistEarthquakeData();


app.use('/api', router)