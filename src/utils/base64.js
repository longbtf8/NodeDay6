const { Buffer } = require("node:buffer");

const encode = (str, safeUrl = false) => {
  return Buffer.from(str).toString(safeUrl ? "base64url" : "base64");
};
module.exports = { encode };
