const User = require("./../models/User");
const cloudinary = require('cloudinary').v2;


async function getUserDetails(req, res) {
  const user = await User.findOne({ user_id: req.query.user_id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
}

async function updateUserDetails(req, res) {
  try {
    const user_details = req.body;
    const { user_image } = req.files;
    const user = await User.findOne({ user_id: user_details.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_image) {
      const cloudImg = await cloudinary.uploader.upload(user_image.path, {
        folder: "profileImg",
      });
      user_details.user_image = cloudImg.secure_url;
    }

    // Update user details
    const updatedUser = await user.updateOne(user_details);

    const upuser = await User.findOne({ user_id: user_details.user_id });

    return res.json({
      message: "User details updated successfully",
      user: upuser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserImage(req, res) {
  const { user_id } = req.query;

  try {
    // Find the user by user_id
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming the user's image URL is stored in user.user_image
    const userImage = user.user_image;

    return res.json({ user_image: userImage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function insertUser(req, res) {
  const { user_details } = req.body;

  try {
    // Create a new user
    const newUser = await User.create(user_details);

    return res.json({ message: "User inserted successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function deleteUser(req, res) {
  const { user_id } = req.query;

  try {
    // Find the user by user_id
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.delete()

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  getUserDetails,
  updateUserDetails,
  getUserImage,
  insertUser,
  deleteUser
};
