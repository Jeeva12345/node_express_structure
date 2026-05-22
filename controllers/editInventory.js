const User = require("../models/inventoryModel");

const getUsers = async (req, res) => {
  try {

    const count = await User.countDocuments();

    const users = await User.find().limit(2);

    console.log("users", users);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.log("Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.price = 3000;
    const result = await user.save(); 
    console.log("result", result)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log("err", err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    
    const dd = await user.save();

    console.log("dd", dd)

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log("err", err)
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};

// .sort()  .limit() .skip()
 