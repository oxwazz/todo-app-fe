import axios from 'axios'

type LoginFn = ({
  username,
  password,
}: {
  username: string
  password: string
}) => Promise<[error: any, data: any]>

const login: LoginFn = async (loginData) => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/login`
    const { data } = await axios.post(endpoint, loginData)

    return [null, data]
  } catch (error: any) {
    return [error.response.data, null]
  }
}
export default login
