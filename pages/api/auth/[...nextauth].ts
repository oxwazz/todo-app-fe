import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const login = async (username: any, password: any): Promise<any[]> => {
  try {
    const { data } = await axios.post('http://localhost:8080/user/login', {
      username: username,
      password: password,
    })
    return [null, data]
  } catch (error: any) {
    console.log(error.response.data.error)
    return [error.response.data.error, {}]
  }
}

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        const [err, data] = await login(credentials.username, credentials.password)
        console.log(3333, err, data)
        // database look up
        // login failed

        if (err) return null

        return {
          id: 2,
          name: 'John',
          email: 'johndoe@test.com',
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      console.log(3333, { token, user })
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      console.log(3333, { session, token })
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    // encryption: true,
  },
  pages: {
    signIn: '/login',
  },
})
