const db = require("@/config/database");

const getInfoUserLogin = async (email) => {
  const [users] = await db.query(`select * from users where email =?`, [email]);
  const user = users[0];
  return user;
};
const registerUser = async (email, password) => {
  const [{ insertId }] = await db.query(
    `insert into users (email,password) values (?,?)`,
    [email, password],
  );
  return insertId;
};
const logout = async (accessToken, tokenPayload) => {
  const query = `insert into revoked_tokens (token,expires_at) values (?,?)`;
  await db.query(query, [accessToken, new Date(tokenPayload.exp)]);
};
module.exports = { getInfoUserLogin, registerUser, logout };
