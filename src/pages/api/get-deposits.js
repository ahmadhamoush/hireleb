import { initMongoose } from '../../../lib/initMongoose'
import Deposit from 'models/Deposit'

export async function getDeposits() {
  return await Deposit.find().exec()
}
export async function getDeposit(id) {
  return await Deposit.findOne({ _id: id }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  res.json(await getDeposits())
}
