import formidable from 'formidable'
import { initMongoose } from '../../../lib/initMongoose'
import ServiceProposal from 'models/ServiceProposal'
import { getService } from './get-services'

export const config = {
  api: {
    bodyParser: false,
  },
}

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable()
    //parsing req form
    form.parse(req, async (err, fields) => {
      //reject if err
      if (err) reject(err)
      //get fields if no errors
      resolve({ fields })
      //connecting to db
      await initMongoose()
      const proposal = ServiceProposal.create({
        service: await getService(fields.id),
        client: fields.client,
        freelancer: fields.freelancer,
        proposal: fields.proposal,
        status: 'pending',
        createdAt: new Date().toISOString().slice(0, 10),
      })
    })
  })
}

export default async function handler(req, res) {
  await parseForm(req)
  res.json({ done: 'ok' })
}
