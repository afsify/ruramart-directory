import { User } from "../../model/user.model.js";

//! ============================================= Update Profile =============================================

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, place, image } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    user.name = name;
    user.phone = parseInt(phone);
    user.place = place;
    user.image = image;
    await user.save();
    const userData = await User.findById(req.userId, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    res.status(200).json({
      success: true,
      userData,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== Find User ===============================================

export const findUser = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.userId } });
    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

