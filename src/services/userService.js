import logger from '../utils/logger';
import { User } from '../models';

/**
 * Create new user.
 *
 * @param  {String}  username
 * @param  {String}  password
 * @return {Promise}
 */
export function createUser(username, password) {
  logger.info(`UserService - createUser - Going to create the user. username : ${JSON.stringify(username)}`);

  const user = new User({ username, password });
  return user.save();
}

/**
 * Find user.
 *
 * @param  {String}  username
 * @return {Promise}
 */
export function findUser(username) {
  logger.info(`UserService - findUser - Going to find the user. username : ${JSON.stringify(username)}`);

  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .exec((err, user) => {
        if(user) {
          resolve(user);
        } else if (err) {
          reject(err);
        } else {
          reject("no user found");
        }
      });
  });
}
