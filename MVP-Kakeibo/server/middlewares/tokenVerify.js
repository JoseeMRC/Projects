const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json("You1 don't have authorization");
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).json("You 2don't have authorization");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).json("You3 don't have authorization");
    }
    next();
  });
};



module.exports = {
  tokenVerify: tokenVerify
  
}
