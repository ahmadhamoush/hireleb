import mongoose from 'mongoose'

const ServiceProposalSchema = new mongoose.Schema({
  service: Object,
  client: String,
  freelancer: String,
  status: String,
  proposal: String,
  createdAt: String,
  updates:Array,
  paid:Boolean
})

module.exports =
  mongoose.models.ServiceProposal ||
  mongoose.model('ServiceProposal', ServiceProposalSchema)
3
