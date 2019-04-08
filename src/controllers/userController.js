import * as HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import logger from '../utils/logger';

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  logger.info(`UserController - User create request received. req.body: ${JSON.stringify(req.body)}`);
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}
