const jwt = require('jsonwebtoken');
const byCript = require('bcryptjs');
const configKey = require('../../../config/auth.config');
const { validationResult } = require('express-validator');
const userModel = require('../model/user');
const { serialize } = require('cookie');
const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('The input value is incorrect');
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }
  try {
    const { user_name, password } = req.body;
    const hashedPasword = await byCript.hash(password, 10);
    const userData = {
      user_name,
      password: hashedPasword,
    };
    const userCreated = await userModel.insertNewUser(userData);
    if (!userCreated.success) {
      const error = new Error(userCreated.msg);
      error.status = 400;
      throw error;
    }
    return res.status(201).json({
      msg: 'User Create successfully',
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    //const userFound = await db('users').where({id}).select('*').first();
    const { user_name, password } = req.body;
    const userFound = await userModel.findUserName(user_name);
    if (!userFound.success) {
      const error = new Error(userFound.msg);
      error.status = 404;
      return next(error);
    }
    const passwordSaved = userFound.data.password;
    const idUser = userFound.data.id;
    const passwordCripted = await byCript.compare(password, passwordSaved);
    if (!passwordCripted) {
      const error = new Error('invalid Password');
      error.status = 401;
      error.accessToken = null;
      throw error;
    }
    const token = jwt.sign(
      { id: idUser, user_name: userFound.data.user_name, role: 'user' },
      configKey.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 3600, // Expira en 24 horas
      }
    );

    const serealized = serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', serealized);
    return res.status(200).json({
      msg: 'Login succesfully',
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.cookies.token;
  } catch (error) {}
};

const userProfile = async (req,res,next)=>{
  try{
    const {id, user_name, role} = req;
    return res.status(200).json({
      id,
      user_name,
      role
    });
  }catch(error){
    next(error);
  }
}
const userLogout = async (req, res, next) => {
  try {
    res.clearCookie('token',{
      httpOnly: true,
      sameSite: 'strict',
      path: '/', // Asegúrate de que coincida con la configuración inicial de la cookie
    });
    return res.status(200).json({
      msg: 'Logout succesfully',
    });
  } catch (error) {
    next(error);
  }
}
const userContent = (req, res) => {
  res.status(200).send('User Content.');
};
const userAdmin = (req, res) => {
  res.status(200).send('Admin Content.');
};
const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};
module.exports = {
  signUp,
  signIn,
  userAdmin,
  userContent,
  allAccess,
  userProfile,
  userLogout
};
