import { Router } from 'express';
import { get, post } from '../controllers/earthquake.controller.js';

const router = Router();


// Ruta GET
router.get('/getEarthquakes', get );


// Ruta POST
router.post('/postEarthquake', post)



export default router;