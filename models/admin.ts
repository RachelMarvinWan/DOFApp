import mongoose, { Schema, model, models } from 'mongoose'; 

const adminschema = new Schema ({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  name: 
});
