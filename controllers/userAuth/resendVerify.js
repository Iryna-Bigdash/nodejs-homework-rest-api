const sendEmail = require("../../helpers/sendEmail");
const { User } = require("../../models/user");
const { BASE_URL } = process.env;

const resendVerify = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "missing required field email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
