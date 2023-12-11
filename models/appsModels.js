import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({

  icon: 
  { 
    type: String, 
    required: true 
  },

  name: 
  { 
    type: String, 
    required: true 
  },

  configuration: 
  { 
    type: String, 
    required: true 
  },

});

export default mongoose.model("App", appSchema);