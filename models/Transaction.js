import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  credits: Number,
  date:String,
})

module.exports =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
