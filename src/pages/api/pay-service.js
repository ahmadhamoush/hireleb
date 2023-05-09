import formidable from 'formidable'
import ServiceProposal from 'models/ServiceProposal'
import Transaction from 'models/Transaction'
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
      // updating proposal status to paid
      const updatedProposal = await ServiceProposal.updateOne(
        {
          _id: fields.id,
        },
        {
          paid: true,
          $push: {
            updates: {
              message: 'Service Paid',
              date: new Date().toLocaleString(),
              sender: fields.from,
            },
          },
        },
      )

      //checking if user currently has a transaction object
      let foundFromUser = await Transaction.findOne({ user: fields.from })
      let foundToUser = await Transaction.findOne({ user: fields.to })

      //update transaction if found
      if (foundFromUser) {
        //transfering credits
        await Transaction.updateOne(
          { user: fields.from },
          {
            $push: {
              transfers: {
                credits: fields.credits,
                to: fields.to,
                date: new Date().toLocaleString(),
              },
            },
          },
        )
      }
      //create a new transaction object if doesnt exist
      else {
        await Transaction.create({
          user: fields.from,
          transfers: [
            {
              credits: fields.credits,
              to: fields.to,
              date: new Date().toLocaleString(),
            },
          ],
        })
      }
      const deductUser = await User.findOne({ email: fields.from })
      // deducting credits fron client's account
      await User.updateOne(
        { _id: deductUser._id },
        { credits: Number(deductUser.credits) - Number(fields.credits) },
      )
      //update transaction if found
      if (foundToUser) {
        //receiving credits
        await Transaction.updateOne(
          { user: fields.to },
          {
            $push: {
              received: {
                credits: fields.credits,
                from: fields.from,
                date: new Date().toLocaleString(),
              },
            },
          },
        )
      }
      //create a new transaction object if doesnt exist
      else {
        await Transaction.create({
          user: fields.to,
          received: [
            {
              credits: fields.credits,
              from: fields.from,
              date: new Date().toLocaleString(),
            },
          ],
        })
      }
      const addUser = await User.findOne({ email: fields.to })
      // adding credits to freelancer's account
      await User.updateOne(
        { _id: addUser._id },
        { credits: Number(addUser.credits) + Number(fields.credits) },
      )
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await parseForm(req)
  res.json({ done: 'ok' })
}
