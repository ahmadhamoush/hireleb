import { initMongoose } from '../../../lib/initMongoose'
import ServiceProposal from 'models/ServiceProposal'

//fetching client's proposals
export async function getClientServiceProposals(client) {
  return ServiceProposal.find({ client: client }).exec()
}
//fetching freelancer's proposals
export async function getFreelancerServiceProposals(freelancer) {
  return ServiceProposal.find({ freelancer: freelancer }).exec()
}
//fetching accepted proposals
export async function getFreelancerServiceAcceptedProposals(freelancer) {
  return ServiceProposal.find({ freelancer: freelancer })
}
export async function getClientServiceAcceptedProposals(client) {
  return ServiceProposal.find({ client: client })
}
//fetching all proposals
export async function getAllServiceProposals() {
  return ServiceProposal.find().exec()
}
export async function getServiceProposal(id) {
  return ServiceProposal.find({ _id: id }).exec()
}

export default async function handler(req, res) {
  await initMongoose()
  return res.json(await getAllServiceProposals())
}
