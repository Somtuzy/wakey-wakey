const { logger } = require('./configs/index.config');

module.exports = (
  error,
  req,
  res,
  next
) => {
  let message = error.message
  logger.error(message);

  return res.status(500).json({
    success: false,
    message: message,
  });
};