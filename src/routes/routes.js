import { Router } from 'express';
import { get, post } from '../controllers/earthquake.controller.js';

const router = Router();


// Ruta GET
router.get('/features', get );


// Ruta POST
router.post('/features/:feature_id/comments', post)



export default router;