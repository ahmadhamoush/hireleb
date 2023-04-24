import { initMongoose } from '../../../../lib/initMongoose'
import User from 'models/User'
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  let valid = false
  await initMongoose()
  const foundUser = await User.findOne({ email: req.body.email })
  //checking if another user exists with same email
  if (foundUser) {
    res.json({ message: 'Email Taken' })
  } else {
    if (req.body.password.length <= 6) {
      res.json({
        message: `Password should contain at least 6 characters. ${
          6 - req.body.password.length
        } remaining`,
      })
    } else {
      valid = true
      //hashing password then saving user to db
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await User.create({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          password: hash,
          type: req.body.type,
        })
      })
    }
    res.status(201).json({ message: 'User Created', valid })
  }
}
