# MEAN demo

## Server
* **M**ongoDB, **N**ode.js, **E**xpress
  * All API requests require a valid token issued at login through [`middleware.js`](https://github.com/natemow/mean_demo/blob/master/app/server/middleware.js).
  * All API responses are standardized through custom [`crud.js`](https://github.com/natemow/mean_demo/blob/master/app/server/models/crud.js) module; all client messaging and success/failure toggling is driven by the API.
    <pre><code>// Add CRUD methods to object for APIs.
    var user = mongoose.model('User', UserSchema);
    var crud = require('./crud')(user);

    module.exports = user;</code></pre>

## Client
* **A**ngularJS
  * Login stores the token issued from the server's `/auth` endpoint in local browser storage (via `AuthStorage`).
  * Outbound requests to the API have the `x-access-token` HTTP header added via [`AuthInterceptor`](https://github.com/natemow/mean_demo/blob/master/app/client/app/services/auth.js).
  * Pretty URLs, 404 handling and fading page transitions handled in [`routes.js`](https://github.com/natemow/mean_demo/blob/master/app/client/app/routes.js) and basic `/client/assets/styles.css`.
