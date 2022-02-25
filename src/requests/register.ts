import axios from 'axios'

type Params = {
  username: string
  password: string
  email: string
  profile_picture?: string
}

type DataReturn = [error: any, data: {} | string]

const register = async ({
  username,
  password,
  email,
  profile_picture = '',
}: Params): Promise<DataReturn> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/register`
    console.log(33339, endpoint)
    const { data } = await axios.post(endpoint, {
      username,
      password,
      email,
      profile_picture,
    })
    console.log(333399, 'error.response.data.error')
    return [null, data]
  } catch (error: any) {
    console.log(333399, error.response)
    return [error.response.data.error, {}]
  }
}

export default register
