import { initMongoose } from '../../../lib/initMongoose'
import Job from 'models/Job'

export async function getUserJobs(postedBy) {
  return await Job.find({ postedBy: postedBy }).exec()
}
export async function getJobs() {
  return await Job.find().exec()
}
export async function getJob(id) {
  return await Job.findOne({ _id: id }).exec()
}
export default async function handler(req, res) {
  await initMongoose()
  res.json(await getJobs())
}
