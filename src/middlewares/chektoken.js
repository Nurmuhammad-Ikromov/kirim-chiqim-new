import jwt from "jsonwebtoken";

// Token
export default (req, res, next) => {
  console.log("request token");

  try {
    const { token } = req.headers;

    if (!token) {
      return res?.status(500).send({
        status: 500,
        message: "Required token",
      });
    }

    // Tokenni maxfiy kalit bilan tekshirish (keyni mos ravishda o'zgartirish kerak)
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      console.log(decoded);
      if (err) {
        return res.status(500).send({
          status: 500,
          message: "Invalid token",
        });
      }
      console.log(decoded);

      console.log(req.ip);
      

      req.user = decoded;

      // Token to'g'ri bo'lsa, decoded ob'ektini requestga qo'shamiz
    });
    return next();
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
