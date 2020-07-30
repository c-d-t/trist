const expressRateLimiter = require('express-rate-limit');

const rateLimiter = (max, seconds) => {
    return expressRateLimiter({
    windowMs: 1000 * seconds,
    max: max,
    message: 'You\'re sending too many requests.',
    headers: true,
  });
};

module.exports = rateLimiter;
