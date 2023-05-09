import formidable from 'formidable'
import ServiceProposal from 'models/ServiceProposal'
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

      //connecting to db
      await initMongoose()

      const foundProposal = await ServiceProposal.findOne({ _id: fields.id })
      //updating status to complete only if service is pa
      resolve({ fields, foundProposal })
      if (foundProposal.paid) {
        // updating service status and saving it to db
        const updatedProposal = await ServiceProposal.updateOne(
          {
            _id: fields.id,
          },
          {
            status: 'completed',
            $push: {
              updates: {
                message: 'Service Completed',
                date: new Date().toLocaleString(),
                sender: fields.sender,
              },
            },
          },
        )
      }
    })
  })
}
export default async function handler(req, res) {
  //calling function
  res.json(await parseForm(req))
}
