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
      // creating new project and saving it to db
      const deletedUser = await User.deleteOne({
        email: fields.email,
      })
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await parseForm(req)
  res.json({ done: 'ok' })
}
