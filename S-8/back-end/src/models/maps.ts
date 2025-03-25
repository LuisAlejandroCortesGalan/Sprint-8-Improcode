import { Schema, model } from "mongoose";

const mapSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false }, 
  start: { type: Date, required: false },      
  end: { type: Date, required: false },        
  description: { type: String, required: true },
  lat: { type: Number, required: true },       
  lng: { type: Number, required: true }
});

export default model("Map", mapSchema);
