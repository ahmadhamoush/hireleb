import formidable from 'formidable'
import Withdraw from 'models/Withdraw'
import { initMongoose } from 'lib/initMongoose'

export const config = {
  api: {
    bodyParser: false,
  },
}
 
//function to be called in body
const readFile = (req) => {
  return new Promise((resolve, reject) => {
    //parsing form using formidable
    const form = formidable()
    form.parse(req, async (err, fields) => {
      //checking if there are errors
      if (err) reject(err)
      resolve({ fields })
      
      //connecting to db
      await initMongoose()
      // creating new deposit and saving it to db
      const withdraw = await Withdraw.create({
        user: fields.user,
        credits: fields.credits,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
      })
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await readFile(req)
  res.json({ done: 'ok' })
}
