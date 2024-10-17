const errorHandling = async (err, req, res, next) => {
    console.log(err.stack);
    return res.status(err.status || 500).json({
      message: err.message,
      details: err.details || 'internal Server Error',
    });
  };
  module.exports = {
    errorHandling,
  };
  