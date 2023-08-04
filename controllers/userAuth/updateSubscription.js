const { User, schemas } = require('../../models/user');

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = schemas.subscriptionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { _id } = req.user;
    const { subscription } = req.body;

    if (!['starter', 'pro', 'business'].includes(subscription)) {
      return res.status(400).json({ message: 'Invalid subscription value' });
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
