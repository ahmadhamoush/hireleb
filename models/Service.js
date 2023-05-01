import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  freelancer: String,
  name: String,
  desc: String,
  category: String,
  subcategory: String,
  skills: String,
  experience: String,
  payment: String,
  price: Number,
  delivery: String,
  duration: String,
  time: Number,
  currency: String,
  createdAt: String,
})

module.exports =
  mongoose.models.Service || mongoose.model('Service', ServiceSchema)
