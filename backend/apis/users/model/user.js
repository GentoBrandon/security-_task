const db = require('../../../config/db');

const findUser = async (id) => {
  try {
    const result = await db('users').where({ id }).select('*').first();
    if (!result) {
      return {
        success: false,
        msg: 'user not Found',
      };
    }
    return { success: true, data: result };
  } catch (error) {
    throw {
      msg: 'Error while get data',
      error: error.message,
      stack: error.stack,
    };
  }
};
const insertNewUser = async (body) => {
  try {
    const result = await db('users').insert({
      user_name: body.user_name,
      password: body.password,
    });
    if (!result) {
      return {
        success: false,
        msg: `could'nt create user`,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    throw {
      msg: 'Error while save user',
      error: error.message,
      stack: error.stack,
    };
  }
};

const findUserName = async (name) => {
  try {
    const result = await db('users')
      .where({ user_name: name })
      .select('*')
      .first();
    if (!result) {
      return {
        success: false,
        msg: 'user not Found',
      };
    }
    return { success: true, data: result };
  } catch (error) {
    throw {
      msg: 'Error while get data',
      error: error.message,
      stack: error.stack,
    };
  }
};

module.exports = {
  findUser,
  insertNewUser,
  findUserName,
};
