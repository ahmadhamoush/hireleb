import { initMongoose } from '../../../lib/initMongoose'
import User from 'models/User'
export async function getUser(id) {
  return User.findOne({ _id: id }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getUser(req.body.id))
}
