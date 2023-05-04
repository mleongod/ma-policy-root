import * as express from 'express';

const router = express.Router();

// environment config
router.get('/env.json', (req, res) => {
  const data = {
    countryCode: req.headers['cf-ipcountry'] || 'DE',
  };

  return res.json(data);
});

export { router as configRoutes };
