import axios from 'axios'

type Params = { username: string; password: string }
type DataReturn = [error: any, data: {} | string]

const login = async ({ username, password }: Params): Promise<DataReturn> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/login`
    const { data } = await axios.post(endpoint, { username, password })
    return [null, data]
  } catch (error: any) {
    console.log(33334, error)
    console.log(error.response.data.error)
    return [error.response.data.error, {}]
  }
}

export default login
