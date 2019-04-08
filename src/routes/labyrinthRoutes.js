import { Router } from 'express';

import * as labyrinthController from '../controllers/labyrinthController';

const router = Router();

router.get("/", labyrinthController.findLabyrinths);
router.get("/:id", labyrinthController.findLabyrinthById);
router.get("/:id/solution", labyrinthController.labyrinthSolution);

router.post("/", labyrinthController.createLabyrinth);
router.post("/:id/playfield/:x/:y/:type", labyrinthController.updateLabyrinth);
router.post("/:id/start/:x/:y", labyrinthController.updateLabyrinthStart);
router.post("/:id/end/:x/:y", labyrinthController.updateLabyrinthEnd);

export default router;

