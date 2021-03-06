import * as HttpStatus from 'http-status-codes';
import * as labyrinthService from '../services/labyrinthService';
import logger from "../utils/logger";

/**
 * Get all Labyrinths.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findLabyrinths(req, res, next) {
  const user = req.user._id;
  logger.info(`LabyrinthController - Fetch all Labyrinths request received. user: ${user}`);
  labyrinthService
    .findLabyrinths(user)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Get a Labyrinths by it's id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findLabyrinthById(req, res, next) {
  const user = req.user._id;
  const stateId = req.params.id;
  logger.info(`LabyrinthController - Labyrinth findById request received.  user: ${user}, stateId: ${stateId}`);
  labyrinthService
    .findLabyrinthById(user, stateId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Get Solution of Labyrinths by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function labyrinthSolution(req, res, next) {
  logger.info(`LabyrinthController - Labyrinth solution request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .labyrinthSolution(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Create a new Labyrinth.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function createLabyrinth(req, res, next) {
  const user = req.user._id;
  logger.info(`LabyrinthController - Labyrinth create request received. user: ${user}`);
  labyrinthService
    .createLabyrinth(user)
    .then(data => res.status(HttpStatus.CREATED).json(data._id))
    .catch(err => next(err));
}

/**
 * Update existing Labyrinth's Block Type.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateLabyrinth(req, res, next) {
  logger.info(`LabyrinthController - Labyrinth update request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .updateLabyrinthType(req.params.id, req.params.x, req.params.y, req.params.type)
    .then(() => res.status(HttpStatus.OK))
    .catch(err => next(err));
}

/**
 * Update existing Labyrinth Start.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateLabyrinthStart(req, res, next) {
  logger.info(`LabyrinthController - Labyrinth start update request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .updateLabyrinthStart(req.params.id, req.params.x, req.params.y)
    .then(() => res.status(HttpStatus.OK))
    .catch(err => next(err));
}

/**
 * Update existing Labyrinth End.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateLabyrinthEnd(req, res, next) {
  logger.info(`LabyrinthController - Labyrinth end update request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .updateLabyrinthEnd(req.params.id, req.params.x, req.params.y)
    .then(() => res.status(HttpStatus.OK))
    .catch(err => next(err));
}

