const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const oldAdmin = await Admin.findOne({ email });

    if (oldAdmin) {
      return res.send(error(409, "Admin is already registered"));
    }

    const admin = await Admin.create({
      email,
      password,
    });

    return res.send(success(201,admin));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.send(error(404, "Admin is not registered"));
    }

    if (password !== admin.password) {
      return res.send(error(403, "incorrect password"));
    }
    admin.last_logged_in = Date.now();
    await admin.save();

    const accessToken = generateAccessToken({
      _id: admin._id,
    });

    return res.send(success(200, { accessToken }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email) {
      return res.send(error(400, "All fields are required"));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.send(error(404, "Admin is not registered"));
    }

    admin.password = newPassword;
    await admin.save();

    return res.send(success(200, "password updated success"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//internal functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  loginController,
  forgotPassword,
};
