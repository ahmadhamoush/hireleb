import { initMongoose } from '../../../lib/initMongoose'
import User from 'models/User'
export async function getUser(email) {
  return User.findOne({ email: email }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getUser(req.body.email))
}
