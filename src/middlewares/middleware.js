import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import logger, { logStream } from '../utils/logger';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default app => {
  if (isProd) {
    logger.info('Attaching helmet middleware as in Production mode.');
    app.use(helmet());
  }
  // for cross origin support
  app.use(cors());

  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true }));
  // form-urlencoded

  if (isDev) {
    logger.info('Attaching morgan middleware as in Dev mode.');
    // Morgan is using to log HTTP requests and Logger stream will used to log all the requests to log file.
    app.use(morgan('dev', { stream: logStream }));
  }
};
