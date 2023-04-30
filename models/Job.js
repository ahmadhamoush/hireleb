import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    subcategory: String,
    skills: String,
    experience: String,
    hourlyrate: Number,
    currency: String,
    postedBy:String,
    createdAt:String,
})

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema)
