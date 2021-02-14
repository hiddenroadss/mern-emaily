const createProxyMiddleware  = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/auth", "/auth/google", "/api/stripe"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};