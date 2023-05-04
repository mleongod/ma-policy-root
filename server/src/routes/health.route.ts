import * as express from 'express';

const router = express.Router();

router.get(['/', '/liveness', '/readiness'], (req, res) => {
  res.json({
    status: 'UP',
  });
});

export { router as healthRoutes };
