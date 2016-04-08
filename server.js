import winston from 'winston';
import 'winston-logstash';

const _printConnectionError = (reason = 'Unknow error') => {
  console.log(`winston-logstash can't establish connection to Logstash: ${reason}`);
}

export default class Logger {
  constructor({host, port, label} = paramenters) {
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

    let transports = [];

    if (process.env.NODE_ENV == 'development') {
      transports.push(
        new winston.transports.Console({
          label: label,
          colorize: true,
          level: 'error',
          handleExceptions: true
        })
      );
    }

    if (host && port) {
      transports.push(
        new winston.transports.Logstash({
          host: host,
          port: port,
          label: label,
          level: 'error',
          handleExceptions: true
        })
      );
    }

    this.logger = new winston.Logger({
      levels: customLevels.levels,
      transports: transports
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

if (Meteor.settings && Meteor.settings.LogstashHost) {
  if (Meteor.settings && Meteor.settings.LogstashPort) {
    logger = new Logger({
      host: Meteor.settings.LogstashHost,
      port: Meteor.settings.LogstashPort,
      label: Meteor.settings.LogstashLabel
    });
  } else {
    _printConnectionError("Missing Meteor.settings.LogstashPort environment variable")
  }
} else {
  _printConnectionError("Missing Meteor.settings.LogstashHost environment variable")
}


Meteor.methods({
  'winston-client': (level, message) => {
    logger[level](message)
  }
});

