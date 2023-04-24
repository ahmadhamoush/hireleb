import User from 'models/User'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { initMongoose } from '../../../../lib/initMongoose'

export const authOptions = {
  // Using Credentials Provider (Taking email and password from user)
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await initMongoose() // connecting to db
        //destructuring email and password from credentials obj
        const { email, password } = credentials
        //checking if email exists
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error('Invalid Email or Password')
        }
        //hashing and comparing password with original hash
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }
        //returning user if authenticated
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
}
export default NextAuth(authOptions)
