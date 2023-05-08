import { initMongoose } from '../../../lib/initMongoose'
import Transaction from 'models/Transaction'

//fetching user's Transactions
export async function getTransactions(email) {
  return Transaction.findOne({ user: email }).exec()
}
//fetching all Transactions
export async function getAllTransactions() {
  return Transaction.find().exec()
}

export async function getTransaction(id) {
  return Transaction.find({ _id: id }).exec()
}

export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getAllTransactions())
}
