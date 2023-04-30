import { initMongoose } from '../../../lib/initMongoose'
import Project from 'models/Project'
export async function getProjects(email) {
  return Project.find({ owner: email }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getProjects(req.body.email))
}
