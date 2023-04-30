import formidable from "formidable";
import { initMongoose } from "../../../lib/initMongoose";
import Job from 'models/Job'

export const config = {
    api: {
      bodyParser: false,
    },
  }

  const parseForm = (req)=>{
    return new Promise((resolve,reject)=>{
        const form = formidable()
        form.parse(req, async (err,fields)=>{
            if(err) reject(err)
            resolve({fields})
            await initMongoose()
            const createJob = await Job.create({
                title:fields.title,
                desc:fields.desc,
                category:fields.category,
                subcategory:fields.subcategory,
                experience:fields.experience,
                skills:fields.skills,
                currency:fields.currency,
                hourlyrate:fields.hourlyrate,
                postedBy: fields.email,
                createdAt:new Date().toISOString().slice(0, 10),
            },)
        })
    })
  
  }

export default async function handler(req,res){
    await parseForm(req)
    res.json({ done: 'ok'})

}