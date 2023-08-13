const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuid } = require('uuid');


const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const hashEmail = await bcrypt.hash(email, 16);
    const verificationToken = uuid(); 

    const avatarURL = gravatar.url(hashEmail, { d: "retro", s: "100" }, true);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
