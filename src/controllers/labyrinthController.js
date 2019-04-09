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
  logger.info(`LabyrinthController - Fetch all Labyrinths request received. req.body: ${JSON.stringify(req.body)}`);
  labyrinthService
    .findLabyrinths(req.body)
    .then(data => res.json({ data }))
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
  logger.info(`LabyrinthController - Labyrinth findById request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .findLabyrinthById(req.params.id)
    .then(data => res.json({ data }))
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
    .then(data => res.json({ data }))
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
  logger.info(`LabyrinthController - Labyrinth create request received. req.body: ${JSON.stringify(req.body)}`);
  labyrinthService
    .createLabyrinth(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update existing Labyrinth.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateLabyrinth(req, res, next) {
  logger.info(`LabyrinthController - Labyrinth update request received. req.params: ${JSON.stringify(req.params)}`);
  labyrinthService
    .updateLabyrinth(req.params.id, req.params.x, req.params.y, req.params.type)
    .then(data => res.status(HttpStatus.OK).json({ data }))
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
    .then(data => res.status(HttpStatus.OK).json({ data }))
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
    .then(data => res.status(HttpStatus.OK).json({ data }))
    .catch(err => next(err));
}

