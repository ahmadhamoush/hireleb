import mongoose from 'mongoose'

const JobProposalSchema = new mongoose.Schema({
  job: Object,
  client: String,
  freelancer: String,
  status: String,
  proposal: String,
  createdAt: String,
  updates: Array,
  paid: Boolean,
})

module.exports =
  mongoose.models.JobProposal ||
  mongoose.model('JobProposal', JobProposalSchema)
3
