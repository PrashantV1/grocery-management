const sequelize = require('./src/appConfig/dbConfig');
const logger = require('./src/appConfig/logger');
const config = require('./src/appConfig/config');
const app = require('./src/app');

const PORT = config.port;

let server;
sequelize
  .sync()
  .then(() => {
    server=  app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));



  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });