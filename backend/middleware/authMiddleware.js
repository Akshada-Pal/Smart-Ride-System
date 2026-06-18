const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next(); // 🔥 THIS WAS MISSING
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;