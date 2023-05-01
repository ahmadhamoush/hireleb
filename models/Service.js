import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  freelancer: String,
  name: String,
  desc: String,
  category: String,
  subcategory: String,
  skills: String,
  experience: String,
  credits: Number,
  payment: String,
  delivery: String,
  duration: String,
  time: Number,
  createdAt: String,
})

module.exports =
  mongoose.models.Service || mongoose.model('Service', ServiceSchema)
