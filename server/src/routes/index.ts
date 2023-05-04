import * as express from 'express';
import * as path from 'path';
import { clientRoutes } from './client.route';
import { configRoutes } from './config.route';
import { healthRoutes } from './health.route';
import { infoRoutes } from './info.route';

const router = express.Router();

// middleware to serve static files on public directory
router.use(express.static(path.join(__dirname, '../public')));

router.use('/config', configRoutes);
router.use('/health', healthRoutes);
router.use('/info', infoRoutes);
router.use('/', clientRoutes);

export { router as routes };
