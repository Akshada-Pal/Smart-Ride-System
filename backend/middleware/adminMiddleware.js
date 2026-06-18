const adminOnly = (req, res, next) => {
  console.log("req.user =", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  next();
};

module.exports = adminOnly;