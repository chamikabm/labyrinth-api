import { Router } from 'express';

import * as userController from '../controllers/userController';

const router = Router();

router.post('/:username/:password', userController.create);

export default router;
