import User from "../Model/User.js";

class user {
  constructor() {}

  static getUser = async (req, res) => {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  };

  static userUpdate = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "user ID is required" });
      }

      const updates = req.body;

      const updateuser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      if (!updateuser) {
        return res.status(404).json({ message: "user not found" });
      }

      res.status(200).json({
        success: true,
        message: "user Updated!",
        user: updateuser,
        token:req.token
      });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "user Deleted!",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };

  static getallTeacher = async (req, res) => {
    try {
      const teacher = "Teacher";

      const allTeacher = await User.find({ role: teacher });

      if (!allTeacher) {
        return res.status(404).json({
          success: false,
          message: "No teacher found ",
        });
      }

      return res.status(200).json({
        success: true,
        allTeacher,
      });
    } catch (error) {
      console.error("Error fetching teacher:", error);
      return res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };
}

export default user;
