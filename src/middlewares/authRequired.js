const authConfig = require("@/config/auth");
const db = require("@/config/database");
const authService = require("@/service/auth.service");

async function authRequired(req, res, next) {
  const accessToken = req.headers?.authorization?.slice(6).trim();
  const payload = await authService.verifyAccessToken(accessToken);

  if (payload.exp < Date.now()) {
    console.log(Date.now(), payload.exp);
    return res.error(401, null, "Unauthorized");
  }
  const [users] = await db.query(
    `select id,email,created_at from users where id=?`,
    [payload.sub],
  );
  const user = users[0];
  if (!user) {
    return res.error(401, null, "Unauthorized");
  }
  req.currentUser = user;
  req.accessToken = accessToken;
  req.tokenPayload = payload;
  next();
}
module.exports = authRequired;
