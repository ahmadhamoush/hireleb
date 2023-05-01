import { initMongoose } from '../../../lib/initMongoose'
import Service from 'models/Service'

//fetching user's Services
export async function getServices(email) {
  return Service.find({ freelancer: email }).exec()
}
//fetching all Services
export async function getAllServices() {
  return Service.find().exec()
}

export async function getService(id) {
  return Service.find({ _id: id }).exec()
}

export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getAllServices())
}
