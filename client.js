const log = (level, ele) => {
  console.log(ele);
  Meteor.call('winston-client', level, ele);
}

logger = {
  silly: (ele) => log('silly', ele),
  debug: (ele) => log('debug', ele),
  info: (ele) => log('info', ele),
  warn: (ele) => log('warn', ele),
  error: (ele) => log('error', ele)
}
