import winston from 'winston';
import 'winston-logstash';


export default class Logger {
  constructor({host, port, label = 'Raw Milk'} = paramenters) {
    let customLevels = {
      levels: {
        debug: 0,
        info: 1,
        silly:2,
        warn: 3,
        error: 4
      },
      colors: {
        silly: 'magenta',
        debug: 'green',
        info: 'cyan',
        warn: 'yellow',
        error: 'red'
      }
    }

    winston.addColors(customLevels.colors);

    this.logger = new winston.Logger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console({
          label: label,
          //timestamp: ()  => Date.now(),
          colorize: true,
          level: 'error',
          handleExceptions: true
        }),
        new winston.transports.Logstash({
          host: host,
          node_name: 'my node name',
          port: port,
          label: label,
          level: 'error',
          handleExceptions: true
        })
      ]
    });
  }

  silly(message) {
    this.logger.silly(message);
  }

  debug(message) {
    this.logger.debug(message);
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }

};

logger = new Logger({
  host: '40.69.25.123',
  port: 5000,
  label: 'survey-app'
});

Meteor.methods({
  'winston-client': (level, message) => {
    logger[level](message)
  }
});
