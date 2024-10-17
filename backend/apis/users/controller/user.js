const userModel = require('../model/user');

const findUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userFound = await userModel.findUser(id);
    if (!userFound.success) {
      const error = new Error(userFound.msg);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ data: userFound.data });
  } catch (error) {
    next(error);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const userCreated = await userModel.insertNewUser(req.body);
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
module.exports = {
  findUser,
  createNewUser,
};
