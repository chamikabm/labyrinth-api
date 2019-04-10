import * as userService from '../services/userService';
import logger from '../utils/logger';

/**
 * Authenticate a Request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function auth(req, res, next) {
  logger.info(`AuthController - Auth request received. req.body: ${JSON.stringify(req.body)}`);
  if(!req.headers.authorization) {
    res.json("No authorization");
  }

  let authHeader = req.headers.authorization.split(" ");
  let decode = Buffer.from(authHeader[1], 'base64').toString("ascii");
  let userData = decode.split(':');
  userService.findUser(userData[0]).then( user => {
    if(user.password === userData[1]) {
      req.user = user;
      next();
    }
  }).catch(err => {
    res.json(err);
  });
}
