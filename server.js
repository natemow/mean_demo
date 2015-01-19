var config = require('./app/server/config');
var app = require('express')();

require('mongoose')
  .connect(config.database.uri);

require('./app/server/middleware')(app, config);
require('./app/server/routes/auth')(app);
require('./app/server/routes/api')(app, '/api');
require('./app/server/routes/client')(app);

// Start the server.
app.listen(config.server.port);
console.log('App running at http://localhost:' + config.server.port + ' (connected to ' + config.database.uri + ')');
