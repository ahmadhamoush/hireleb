import { initMongoose } from '../../../lib/initMongoose'
import JobProposal from 'models/JobProposal'

//fetching client's proposals // received
export async function getClientJobProposals(client) {
  return JobProposal.find({ client: client }).exec()
}
//fetching freelancer's proposals // sent
export async function getFreelancerJobProposals(freelancer) {
  return JobProposal.find({ freelancer: freelancer }).exec()
}
//fetching freelancer's accepted proposals // sent
export async function getFreelancerJobAcceptedProposals(freelancer) {
  return JobProposal.find({ freelancer: freelancer },{status:'accepted'})
}
//fetching client's accepted proposals // sent
export async function getClientJobAcceptedProposals(client) {
  return JobProposal.find({ client: client },{status:'accepted'})
}
//fetching all proposals
export async function getAllJobProposals() {
  return JobProposal.find().exec()
}
export async function getJobProposal(id) {
  return JobProposal.find({ _id: id }).exec()
}

export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getAllJobProposals())
}
