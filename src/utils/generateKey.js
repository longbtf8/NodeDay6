const crypto = require("node:crypto");

function generateKey() {
  const keyBuffer = crypto.randomBytes(4);
  const keyHex = keyBuffer.toString("hex");

  return keyHex;
}
module.exports = generateKey;
