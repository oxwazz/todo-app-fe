import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { login } from '@/src/requests'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password }: any) => {
        const [error, result] = await login({ username, password })
        if (error) throw new Error(error.message)

        const { id, username: username2, email, access_token } = result.data
        return { id, username: username2, email, access_token }
        // return {
        //   id: 2,
        //   name: 'John',
        //   email: 'johndoe@test.com',
        // }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.username = user.username
        token.access_token = user.access_token
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user.id = token.id
        // @ts-ignore
        session.user.username = token.username
        // @ts-ignore
        session.user.access_token = token.access_token
      }

      console.log(33330013, { session, token })
      return session
    },
  },
  secret: 'test',
  // jwt: {
  //   secret: 'test',
  //   // encryption: true,
  // },
  pages: {
    signIn: '/login',
  },
})
