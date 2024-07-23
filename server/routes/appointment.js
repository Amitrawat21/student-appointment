import express from "express";
import appointment from "../controller/appoinment.js";

const router = express.Router();

router.post("/createAppoinment", appointment.createAppontment);
router.get("/getAllAppointment/:id", appointment.getappointment);
router.put("/acceptAppoinment/:id", appointment.acceptappointment);
router.get("/getStudentAppoinment/:id", appointment.getstudentappointment);

export default router;
