import formidable from 'formidable'
import Deposit from 'models/Deposit'
import User from 'models/User'
import Transaction from 'models/Transaction'
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
      console.log(fields)
      // creating new project and saving it to db
      const updatedDeposit = await Deposit.updateOne(
        {
          _id: fields.id,
        },
        {
          status: 'accepted',
        },
      )
      //checking if user currently has a transaction object
      let foundUser = await Transaction.findOne({ user: fields.user })

      //update transaction if found
      if (foundUser) {
        //transfering credits
        await Transaction.updateOne(
          { user: fields.user },
          {
            $push: {
              deposits: {
                credits: fields.credits,
                from: 'admin',
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
          deposits: [
            {
              credits: fields.credits,
              to: fields.user,
              date: new Date().toLocaleString(),
            },
          ],
        })
      }
      const addCredits = await User.findOne({ email: fields.user })
      // deducting credits fron client's account
      await User.updateOne(
        { _id: addCredits._id },
        { credits: Number(addCredits.credits) + Number(fields.credits) },
      )
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await parseForm(req)
  res.json({ done: 'ok' })
}
