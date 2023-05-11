import { initMongoose } from '../../../lib/initMongoose'
import Withdraw from 'models/Withdraw'

export async function getWithdraws() {
  return await Withdraw.find().exec()
}
export async function getWithdraw(id) {
  return await Withdraw.findOne({ _id: id }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  res.json(await getWithdraws())
}
