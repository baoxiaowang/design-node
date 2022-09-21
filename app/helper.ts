export const getToken = function(app, options) {
  return app.jwt.sign(options, app.config.jwt.secret, { expiresIn: '1800s' });
};
