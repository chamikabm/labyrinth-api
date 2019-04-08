import logger from '../utils/logger';

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  logger.info(`UserService - createUser - Going to create the user. user : ${JSON.stringify(user)}`);

  return Promise.resolve(true);
}
