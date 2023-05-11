import mongoose from 'mongoose'

const WithdrawSchema = new mongoose.Schema({
  user: String,
  credits: Number,
  status: String,
  date: String,
})

module.exports =
  mongoose.models.Withdraw || mongoose.model('Withdraw', WithdrawSchema)
3
