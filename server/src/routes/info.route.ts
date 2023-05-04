import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    git: {
      commit: {
        full: process.env.APP_BUILD,
      },
    },
    build: {
      version: process.env.APP_VERSION,
    },
  });
});

export { router as infoRoutes };
