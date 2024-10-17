const express = require('express');
const { errorHandling } = require('../middleware/errorHandling');
const authRouter = require('../apis/users/router/authR');
const usersRouter = require('../apis/users/router/usersR');
const cors = require('cors');
const cookies = require('cookie-parser');
class App {
  #app;
  #_PORT;
  constructor(_PORT) {
    this.#app = express();
    this.#_PORT = _PORT;
  }
  #settings() {
    this.#app.use(express.json());
    this.#app.use(
      cors({
        origin: 'http://localhost:3000', // El dominio del frontend
        credentials: true, // Permitir el envío de cookies
      })
    );
    this.#app.use(cookies());
    this.#app.use(express.urlencoded({ extended: true }));
  }
  #middleware() {
    this.#app.use(errorHandling);
  }
  #setRoutes() {
    this.#app.use('/api/auth', authRouter);
    this.#app.use('/api/users', usersRouter);
  }
  async init() {
    this.#settings();
    this.#setRoutes();
    this.#middleware();
    this.#app.listen(this.#_PORT, async () => {
      console.log(`The server is running in http://localhost:${this.#_PORT}`);
    });
  }
}
module.exports = App;
