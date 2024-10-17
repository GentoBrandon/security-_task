const byCript = require('bcryptjs');
const db = require('../../../config/db');
const { validationResult } = require('express-validator');

const verifyUserName = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('The input value is incorrect');
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }
  try {
    const { user_name } = req.body;
    const nameUser = user_name;
    const userFound = await db('users')
      .where({ user_name: nameUser })
      .select('*')
      .first();
    if (userFound) {
      const error = new Error('User Name is already Used');
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
const verifyUserRol = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('The input value is incorrect');
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }
  try {
    const { id_role } = req.body;
    const rolFound = await db('roles')
      .where({ id: id_role })
      .select('*')
      .first();
    if (!rolFound) {
      const error = new Error('the Rol is not Found in database');
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyUserName,
  verifyUserRol,
};
