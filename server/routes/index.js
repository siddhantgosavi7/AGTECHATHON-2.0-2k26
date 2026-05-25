import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { detectDisease, saveDiagnosis } from '../controllers/detectionController.js';
import { getHistory } from '../controllers/historyController.js';
import { createReport, getReports } from '../controllers/reportController.js';
import { getSchemesAndExperts } from '../controllers/schemesController.js';
import { weatherRisk } from '../controllers/weatherController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/detect-disease', upload.single('image'), detectDisease);
router.post('/diagnoses', saveDiagnosis);
router.post('/chatbot', chat);
router.get('/weather-risk', weatherRisk);
router.get('/history', getHistory);
router.get('/reports', getReports);
router.post('/reports', createReport);
router.get('/government-schemes', getSchemesAndExperts);

export default router;
