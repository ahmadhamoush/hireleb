import formidable from 'formidable'
import Service from 'models/Service'
import { initMongoose } from 'lib/initMongoose'

export const config = {
  api: {
    bodyParser: false,
  },
}

//function to be called in body
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    //parsing form using formidable
    const form = formidable()
    form.parse(req, async (err, fields) => {
      //checking if there are errors
      if (err) reject(err)
      //if not then we access the files and files submitted
      resolve({ fields })
      //connecting to db
      await initMongoose()
      // creating new project and saving it to db
      const addService = await Service.create({
        freelancer: fields.email,
        name: fields.name,
        desc: fields.desc,
        category: fields.category,
        subcategory: fields.subcategory,
        skills: fields.skills,
        experience: fields.experience,
        payment: fields.payment,
        credits: fields.credits,
        duration: fields.duration,
        delivery: fields.delivery,
        time: fields.time,
        currency: fields.currency,
        createdAt: new Date().toISOString().slice(0, 10),
      })
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await parseForm(req)
  res.json({ done: 'ok' })
}
