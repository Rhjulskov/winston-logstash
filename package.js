Package.describe({
  name: 'nordlys:winston-logstash',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Client to server winston logging combined with Logstash transport',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nordlys/winston-logstash',
  documentation: 'README.md'
});

Npm.depends({
  "winston": "2.2.0",
  "winston-logstash": "0.2.11"
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.addFiles( 'server.js', [ 'server' ] );
  api.addFiles( 'client.js', [ 'client' ] );
  api.export('logger');
});
