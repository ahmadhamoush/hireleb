import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  user:String,
  deposits:Array,
  transfers: Array,
  received: Array,
})

module.exports =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)
