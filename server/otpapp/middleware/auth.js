const jwt = require("jsonwebtoken");
const usermodels = require("../createUser");

const auth = async (req, res, next) => {
  const { email } = req.body;
  try {
    const token = req.cookies.tokens;
    const verifyUser = jwt.verify(token, "sujaylords100%40gmail.com");
    console.log(verifyUser);
    // next();
    res.json(token);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
