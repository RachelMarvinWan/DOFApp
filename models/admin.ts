import mongoose, { Schema, model, models } from 'mongoose'; 

const adminschema = new Schema ({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  username: {type: String, required: true }, 
  role: {type: String, required: true },
  organisation: {type: String },
});

const admin = models. admin || model('admin', adminschema); 
export default admin; 
