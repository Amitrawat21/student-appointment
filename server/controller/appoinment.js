import Appointment from "../Model/Appointment.js";

class appointment {
  constructor() {}

  static createAppontment = async (req, res) => {
    const { studentId, teacherId, date, time } = req.body;
    try {
      let appointment = new Appointment({ studentId, teacherId, date, time });
      await appointment.save();
      res.json({ success: true, appointment: appointment });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

  static getappointment = async (req, res) => {
    try {
      const teacherId = req.params.id;

      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: "Teacher ID is required",
        });
      }

      const allAppointment = await Appointment.find({
        teacherId: teacherId,
        status: "Pending", // Add condition for pending status
      }).populate("studentId", "name email phone");

      if (!allAppointment || allAppointment.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No pending appointments found",
        });
      }

      return res.status(200).json({
        success: true,
        allAppointment,
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };

  static getstudentappointment = async (req, res) => {
    try {
      const studentId = req.params.id;

      if (!studentId) {
        return res.status(400).json({
          success: false,
          message: "student ID is required",
        });
      }

      const allAppointment = await Appointment.find({
        studentId: studentId,
        // Add condition for pending status
      }).populate("teacherId", "name phone");

      if (!allAppointment || allAppointment.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No pending appointments found",
        });
      }

      return res.status(200).json({
        success: true,
        allAppointment,
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };

  static acceptappointment = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ msg: "Appointment not found" });
      }

      appointment.status = status;
      await appointment.save();
      res.json({ success: true, appointment });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
}

export default appointment;
