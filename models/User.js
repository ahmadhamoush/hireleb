
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fName: String,
  lName:String,
  email: String,
  type:String,
  password:String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
