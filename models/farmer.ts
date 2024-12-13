import mongoose, {Schema, model, models } from 'mongoose'; 

const farmerschema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  username: {type: String, required: true }, 
  role: {type: String, required: true, unique: true }, 
  userID: { type: String, required: true, unique: true },
  organisation: {type: String, required: true },
  registered_by: {type: mongoose.Types.ObjectId,ref: 'admin', required: true },
  created_at: { type: Date, default: Date.now },
});

const farmer = models.farmer || model('farmer', farmerschema);

export default farmer; 
