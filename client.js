const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const isDebugMode = getParameterByName('debug') ? true : false;


const log = (level, msg) => {
  if (isDebugMode) console.log(`${level}: ${msg}`);
  Meteor.call('winston-client', level, msg);
}

logger = {
  silly: (msg) => log('silly', msg),
  debug: (msg) => log('debug', msg),
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg)
}
