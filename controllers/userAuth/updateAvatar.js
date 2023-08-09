const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const jimp = require("jimp");

const tmpDir = path.join(__dirname, "../../", "tmp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({
        massage: "File is required",
      });
    }

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(tmpDir, filename);

    await fs.rename(tempUpload, resultUpload);

    // Processes avatar using jimp
    const avatar = await jimp.read(resultUpload);
    await avatar.cover(250, 250).quality(90).writeAsync(resultUpload);

    // Create unique name for avatar
    const newAvatarPath = path.join(avatarsDir, filename);

    // Move avatar to public/avatars folder
    await fs.rename(resultUpload, newAvatarPath);
    const avatarURL = path.join("avatars", filename);

    // Update URL in database
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
