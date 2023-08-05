const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
