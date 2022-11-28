import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ProjectSchema= new Schema({ 
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  }
});

const Project = mongoose.model('project', ProjectSchema);

export default Project