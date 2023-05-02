import mongoose from 'mongoose'

const JobProposalSchema = new mongoose.Schema({  
  jobID : String,  
  client: String,
  freelancer: String,
  status: String,
  proposal:String,
  createdAt: String,
})

module.exports =
  mongoose.models.JobProposal || mongoose.model('JobProposal', JobProposalSchema)
3
