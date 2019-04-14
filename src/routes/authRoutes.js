import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.all("/labyrinth/*", authController.auth);

export default router;
