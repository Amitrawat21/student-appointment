import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pending' , enum: ['Confirm', 'Pending']  }
  })

 const Appointment =  new mongoose.model("appointment" , appointmentSchema)
 export default Appointment
  