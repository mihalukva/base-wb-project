const proxy = require('http-proxy-middleware');

const apiTarget = process.env.REACT_APP_API_TARGET;

// eslint-disable-next-line
console.log('API target: ', apiTarget);

if (!apiTarget) {
  throw new Error('Empty API target, check .env file');
}

module.exports = app => {
  app.use(
    ['/api'],
    proxy({
      target: apiTarget,
      changeOrigin: true,
    }),
  );
  app.use(
    ['/passport/api/v2', '/g-passport/api/v2'],
    proxy({
      target: 'https://stage-3.cloud.devel',
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: 'localhost',
    }),
  );
};
