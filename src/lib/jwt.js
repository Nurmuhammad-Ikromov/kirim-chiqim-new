import JWT from "jsonwebtoken";
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default {
  sign: (payload) => JWT.sign(payload, JWT_SECRET_KEY),
  verify: (payload) => JWT.verify(payload, JWT_SECRET_KEY),
};
