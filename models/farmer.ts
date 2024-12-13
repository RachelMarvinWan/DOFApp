import mongoose, {Schema, model, models } from 'mongoose'; 

const farmerschema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  username: {type: String, required: true }, 
  role: {type: String, required: true, unique: true }, 
});

const farmer = models.farmer || model('farmer', farmerschema);

export default farmer; 
