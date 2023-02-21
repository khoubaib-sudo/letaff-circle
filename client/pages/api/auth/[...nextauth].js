import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
]


const callbacks = {}

const options = {
  providers,
  callbacks,
}

export default (req, res) => NextAuth(req, res, options)
