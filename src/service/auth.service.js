const authConfig = require("@/config/auth");
const jwt = require("jsonwebtoken");
const base64 = require("../utils/base64");
const crypto = require("crypto");
const jwt2 = {
  sign(payload, secret) {
    //header
    const header = JSON.stringify({
      typ: "JWT",
      alg: "HS256",
    });
    const encodedHeader = base64.encode(header, true);
    const encodedPayload = base64.encode(JSON.stringify(payload), true);
    // signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${encodedHeader}.${encodedPayload}`);
    const signature = hmac.digest("base64url");

    //jwt token
    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    return token;
  },
};

class AuthService {
  async signAccessToken(id) {
    const ttl = authConfig.accessTokenTTL;
    const accessToken = await jwt2.sign(
      {
        sub: id,
        exp: Date.now() / 1000 + ttl,
      },
      process.env.AUTH_JWT_SECRET,
    );
    return accessToken;
  }
  async verifyAccessToken(accessToken) {
    const payload = jwt.verify(accessToken, authConfig.jwtSecret);
    return payload;
  }
}
module.exports = new AuthService();
