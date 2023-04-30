import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  owner: String,
  name: String,
  desc: String,
  url: String,
  image: String,
})

module.exports =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema)
