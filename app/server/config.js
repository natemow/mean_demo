module.exports = {
  server: {
    port: 1337,
    secret: 'this is the biggest secret for creating JWTs!!!',
  },
  client: {
    uri: '/'
  },
  database: {
    uri: 'mongodb://localhost:27017/meany'
  }
};
