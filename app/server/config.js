module.exports = {
  server: {
    port: 8080,
    secret: 'this is the biggest secret for creating JWTs!!!',
  },
  client: {
    uri: '/'
  },
  database: {
    uri: 'mongodb://localhost:27017/meany'
  }
};
