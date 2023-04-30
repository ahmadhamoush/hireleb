import { initMongoose } from '../../../lib/initMongoose'
import Project from 'models/Project'

//fetching user's projects
export async function getProjects(email) {
  return Project.find({ owner: email }).exec()
}
//fetching all projects
export async function getAllProjects() {
    return Project.find().exec()
  }

export async function getProject(id) {
    return Project.find({ _id: id }).exec()
  }

export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getAllProjects())
}
