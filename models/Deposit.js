import mongoose from 'mongoose'

const DepositSchema = new mongoose.Schema({
  user: String,
  receipt:String,
  credits: Number,
  status:String,
  date:String,
})

module.exports =
  mongoose.models.Deposit || mongoose.model('Deposit', DepositSchema)
3