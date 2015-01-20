# MEAN demo

## Server
* **M**ongoDB, **N**ode.js
  * npm: **E**xpress, underscore, mongoose, bcrypt-nodejs, body-parser, jsonwebtoken
  * All API requests require a valid token issued at login.
  * All API responses are standardized through a custom CRUD module; all client messaging is driven by the API.
    <pre><code>// Add CRUD methods to object for APIs.
    var user = mongoose.model('User', UserSchema);
    var crud = require('./crud')(user);

    module.exports = user;</code></pre>

## Client
* **A**ngularJS
  * Bootstrap
  * Login stores the token issued from the server's `/auth` endpoint in local browser storage.
