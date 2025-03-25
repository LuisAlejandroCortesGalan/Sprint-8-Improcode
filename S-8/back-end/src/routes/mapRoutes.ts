import { Router } from 'express';
import { createMap, deleteMap, getMapById, getMaps, updateMap } from '../controllers/mapController';


const router = Router();

// Definición de rutas
router.get('/maps', getMaps);
router.get('/maps/:id', getMapById);
router.post('/maps', createMap);
router.put('/maps/:id', updateMap);
router.delete('/maps/:id', deleteMap);

export default router;
