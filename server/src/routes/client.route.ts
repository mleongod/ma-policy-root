import * as express from 'express';
import * as path from 'path';

const router = express.Router();

// environment config
router.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

export { router as clientRoutes };
