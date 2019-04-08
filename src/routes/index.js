import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes';
import labyrinthRoutes from './labyrinthRoutes';
import authRoutes from './authRoutes';

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/', (req, res) =>
  res.send('Hello from Labyrinth API.')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /gems
router.use('/labyrinth', labyrinthRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
