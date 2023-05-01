import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  type: String,
  password: String,
  image: String,
  credits: Number,
  freelancer: {
    title: String,
    about: String,
    category: String,
    subcategory: String,
    skills: String,
    experience: String,
    hourlyrate: Number,
    banner: String,
  },
  client: {
    title: String,
    about: String,
    category: String,
    subcategory: String,
    skills: String,
    experience: String,
    hourlyrate: Number,
    banner: String,
  },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
