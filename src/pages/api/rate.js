import formidable from 'formidable'
import User from 'models/User'
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
      // updating user with rates and saving it to db
      
      const rateUser = await User.updateOne(
        {
          email: fields.rated,
        },
        {
          $push: {
            rates: {
              quality:(Number(fields.quality)*100)/5,
              deadline:(Number(fields.deadline)*100)/5,
              responsive:(Number(fields.responsive)*100)/5,
              communication:(Number(fields.communication)*100)/5,
              outcome:(Number(fields.outcome)*100)/5,
              date: new Date().toLocaleString(),
              ratedby: fields.ratedBy,
            },
          },
        },
      )
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await parseForm(req)
  res.json({ done: 'ok' })
}
