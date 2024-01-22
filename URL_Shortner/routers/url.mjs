import { generateNewShortURL, getAnalyticsById, redirectToWebsite } from "../controllers/url.mjs"
import express from 'express';

const router = express.Router()

router.post('/', generateNewShortURL)
router.get('/:id', redirectToWebsite)
router.get('/analytics/:id', getAnalyticsById)

export default router